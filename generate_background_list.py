import os

def traverse_directory(root_dir):
    background_list = []

    for dirpath, _, filenames in os.walk(root_dir):
        folder_name = os.path.basename(dirpath)
        for filename in filenames:
            background_path = os.path.join(dirpath, filename)
            background_list.append(background_path)

    return background_list


def generate_js_file(background_list, output_file):
    with open(output_file, 'w') as f:
        f.write('const backgroundList = [\n')
        for folder_name in background_list:
            if folder_name == "sprites":
                continue
            f.write(f"  '{folder_name}',\n")
        f.write('];\n\n')

if __name__ == "__main__":
    backgrounds = 'assets/backgrounds'
    output_sprites = 'background_list.js'

    background_list = traverse_directory(backgrounds)
    generate_js_file(background_list, output_sprites)
