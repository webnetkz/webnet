import os
from csscompressor import compress as compress_css

def get_file_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def write_file_content(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def minify_css(content):
    return compress_css(content)

def minify_and_combine_css_files(directory, output_file):
    combined_content = ''
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.css'):
                file_path = os.path.join(root, file)
                file_content = get_file_content(file_path)
                minified_content = minify_css(file_content)
                combined_content += minified_content + '\n'

    write_file_content(output_file, combined_content)
    print(f"Файл {output_file} успешно создан.")

if __name__ == '__main__':
    css_directory = 'public/css/'
    output_file = 'public/css/min.css'
    minify_and_combine_css_files(css_directory, output_file)
