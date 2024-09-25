from PIL import Image

# Basic hash function to map a word to a value between 0 and 255
def hash_word(word):
    return sum(ord(char) for char in word) % 256  # Hash word to a number in range 0-255

# Function to reverse the hash and get the word corresponding to the hash value
def reverse_hash(word_hash, word_list):
    for word in word_list:
        if hash_word(word) == word_hash:
            return word
    return None  # Return None if no matching word is found

# Function to decode the message from the encoded image
def decode_message(image_path):
    image = Image.open(image_path)
    pixels = image.load()
    width, height = image.size
    
    # Hardcode the length of the message to 4 for this example
    message_length = 6
    red_channel_values = []

    # Extract red channel values from the first 'message_length' pixels
    for i in range(message_length):
        x = i % width
        y = i // width
        if x < width and y < height:  # Ensure we are within bounds
            r, g, b = pixels[x, y]
            red_channel_values.append(r)
            print(f"Pixel at ({x}, {y}): (R: {r}, G: {g}, B: {b})")  # Print the RGB values

    # Print the extracted red channel values
    print("Extracted Red Channel Values:", red_channel_values)

    # Reverse hash to get the corresponding words (you should know the original words)
    # For this example, we will use a hardcoded list of words
    word_list = ["is", "all", "here", "A", "an", "the", "great", "secret", "message"]  # Adjust this as needed
    decoded_message = [reverse_hash(r, word_list) for r in red_channel_values]

    return ' '.join(decoded_message)

# Example usage
image_path = 'encoded_image.png'  # Path to the encoded image

# Decode the message from the image
decoded_message = decode_message(image_path)

# Print the decoded message
print("Decoded message:", decoded_message)
