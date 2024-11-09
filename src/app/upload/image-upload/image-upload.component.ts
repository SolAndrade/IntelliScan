import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  response: string | null = null;
  loading: boolean = false;
  errorMessage: string | null = null;

  @Output() formData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private openAIService: OpenaiService) {}

  useCamera(): void {
    // This opens the camera if the device supports it
    const cameraInput = document.createElement('input');
    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'environment'; // Triggers camera app on mobile
    cameraInput.addEventListener('change', (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.onFileSelect(event);
      }
    });
    cameraInput.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
        this.errorMessage = null; // Clear any previous error message
      } else {
        this.errorMessage = 'The selected file must be an image.';
        this.selectedFile = null; // Reset the file selection
      }
    }
  }

  processTrucho(): void {
    const res = {
      name: 'TULOLIMAPUHALLIN',
      location_in_building: 'kellari-5.krs',
      manufacturer: 'Kojo OY',
      model: 'TILA 602 IV-konehuone',
      serial_number: '1 00301 G3',
      equipment_type: 'ventilation',
      size: '3/3.5',
      age: 'Unknown',
      type_of_material: 'Metal',
      condition: 'Unknown',
      surveyor_comments:
        'The machine must be stopped before service and inspection.',
    };

    this.sendResponseToForm(res);
  }

  processImage(): void {
    if (this.selectedFile) {
      this.loading = true;
      this.response = null;

      this.openAIService.uploadImageToCloudinary(this.selectedFile).subscribe(
        (imageUrl: string) => {
          this.openAIService.analyzeImage(imageUrl).subscribe(
            (res) => {
              try {
                // Extract JSON part from the response
                const responseContent = res.choices[0]?.message?.content || '';
                const jsonStartIndex = responseContent.indexOf('{');
                const jsonEndIndex = responseContent.lastIndexOf('}') + 1;

                if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
                  const jsonString = responseContent.slice(
                    jsonStartIndex,
                    jsonEndIndex
                  );
                  this.response = JSON.parse(jsonString);
                  this.sendResponseToForm(this.response);
                } else {
                  throw new Error('JSON not found in the response');
                }
              } catch (error) {
                console.error('Error parsing response as JSON:', error);
                this.response = 'Invalid response format';
              }
              this.loading = false;
            },
            (error) => {
              console.error('Error analyzing image with OpenAI:', error);
              this.loading = false;
            }
          );
        },
        (error) => {
          console.error('Error uploading image to Cloudinary:', error);
          this.loading = false;
        }
      );
    }
  }

  sendResponseToForm(response: any): void {
    this.formData.emit(response);
  }
}
