import os
from PIL import Image

def create_thumbnail(input_image_path, output_thumbnail_path, size=(100, 100)):
    try:
        with Image.open(input_image_path) as img:
            img.thumbnail(size)
            img.save(output_thumbnail_path, format="WebP")
    except Exception as e:
        print(f"An error occurred: {e}")

input_directory = "assets/sprites"
output_directory = "assets/thumbnails/sprites"
thumbnail_size = (100, 100)

for character_name in os.listdir(input_directory):
    character_dir = os.path.join(input_directory, character_name)
    if os.path.isdir(character_dir):
        thumbnail_character_dir = os.path.join(output_directory, character_name)
        os.makedirs(thumbnail_character_dir, exist_ok=True)

        for image_name in os.listdir(character_dir):
            if image_name.endswith(".webp"):
                image_path = os.path.join(character_dir, image_name)
                thumbnail_name = image_name.rsplit(".", 1)[0] + "_thumb.webp"
                thumbnail_path = os.path.join(thumbnail_character_dir, thumbnail_name)

                create_thumbnail(image_path, thumbnail_path, size=thumbnail_size)
                print(f"Thumbnail created: {thumbnail_path}")