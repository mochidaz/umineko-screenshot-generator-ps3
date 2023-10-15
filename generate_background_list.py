import os

def traverse_directory(root_dir):
    background_list = []

    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(('.bmp', '.webp')):
                background_path = os.path.join(dirpath, filename)
                background_list.append(background_path)

    background_list.sort()

    return background_list


def generate_thumbnail_path(background_path):
    # Replace 'assets/backgrounds' with 'assets/thumbnails/backgrounds'
    thumbnail_path = background_path.replace('assets/backgrounds', 'assets/thumbnails/backgrounds')
    # Insert '_thumb' before the file extension
    base_name, extension = os.path.splitext(os.path.basename(thumbnail_path))
    thumbnail_path = os.path.join(os.path.dirname(thumbnail_path), f"{base_name}_thumb{extension}")
    return thumbnail_path


def generate_js_file(background_list, output_file):
    with open(output_file, 'w') as f:
        f.write('const backgroundList = [\n')
        for background_path in background_list:
            thumbnail_path = generate_thumbnail_path(background_path)
            f.write(f"  {{thumbnail: '{thumbnail_path}', background: '{background_path}'}},\n")
        f.write('];\n\n')

if __name__ == "__main__":
    backgrounds = 'assets/backgrounds'
    output_sprites = 'background_list.js'

    background_list = traverse_directory(backgrounds)
    generate_js_file(background_list, output_sprites)