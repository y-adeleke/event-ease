import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EventImageService {
  private categoryImages: { [key: string]: string } = {
    Technology: "assets/images/events/technology.jpg",
    Music: "assets/images/events/music.jpg",
    Business: "assets/images/events/business.jpg",
    Wellness: "assets/images/events/wellness.jpg",
    Food: "assets/images/events/food.jpg",
    Education: "assets/images/events/education.jpg",
    Art: "assets/images/events/art.jpg",
    Sports: "assets/images/events/sports.jpg",
    Literature: "assets/images/events/literature.jpg",
    Entertainment: "assets/images/events/entertainment.jpg",
  };

  private defaultImage = "assets/images/categories/default.jpg";

  getCategoryImage(category: string): string {
    return this.categoryImages[category] || this.defaultImage;
  }

  getEventImages(eventId: number): string[] {
    // For now, we'll return an array with the category image
    // In a real application, this would fetch actual event images from the backend
    return [this.defaultImage];
  }
}
