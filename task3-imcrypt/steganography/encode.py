from PIL import Image

# Basic hash function to map a word to a value between 0 and 255
def hash_word(word):
    return sum(ord(char) for char in word) % 256  # Hash word to a number in range 0-255

# Modify the red channel of a pixel at a specific index based on the word hash
def modify_pixel(image, pixel_index, word_hash):
    width, height = image.size
    pixels = image.load()

    # Calculate x, y from pixel index
    x = pixel_index % width
    y = pixel_index // width

    # Get the current pixel value
    r, g, b = pixels[x, y]

    # Modify the red channel with the word hash
    pixels[x, y] = (word_hash, g, b)

# Encoder function to embed a message into the image
def encode_message(image_path, message):
    image = Image.open(image_path)
    image = image.convert("RGB")  # Ensure the image is in RGB mode
    words = message.split()

    # Print mapping of each word to its hash value
    print("Word to Hash Mapping:")
    for i, word in enumerate(words):
        word_hash = hash_word(word)
        print(f"Word: '{word}' => Hash: {word_hash}")

        modify_pixel(image, i, word_hash)  # Modify each pixel based on the word's hash

    # Save the modified image with the embedded message
    image.save('encoded_image.png')

# Example usage
image_path = 'your_image.png'  # Replace with your image path
message = "the great secret message is here"  # Message to embed into the image

# Encode the message into the image
encode_message(image_path, message)

print("Message has been encoded into the image and saved as 'encoded_image.png'")
