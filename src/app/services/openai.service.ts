import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private openAiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = process.env['openAiApiKey'];

  private cloudinaryUploadUrl =
    'https://api.cloudinary.com/v1_1/intelliScan/image/upload';
  private cloudinaryUploadPreset = 'junction';

  constructor(private http: HttpClient) {}

  // Upload image to Cloudinary
  uploadImageToCloudinary(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post<any>(this.cloudinaryUploadUrl, formData).pipe(
      map((response) => {
        if (response.secure_url) {
          return response.secure_url;
        } else {
          throw new Error('Image URL not found in response.');
        }
      })
    );
  }

  // Send image URL to OpenAI for analysis
  analyzeImage(imageUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze the following image and return a structured JSON object with the following details:',
            },
            {
              type: 'text',
              text: "Equipment name, location in the building, manufacturer, model, serial number, equipment type (e.g., structure, ventilation, electrical), size, age, type of material, condition, and surveyor's comments.",
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    };

    return this.http.post(this.openAiApiUrl, body, { headers });
  }
}
