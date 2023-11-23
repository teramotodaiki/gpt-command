# GPT Command

## Installation

1. git clone this repo
2. `npm install`
3. `npm link`
4. Set your OpenAI API key to .env file

## Usage

```
gpt <prompt>
```

## Example

```
gpt Change all .csv files recursively to .txt
```

## Output

> To change all `.csv` files recursively to `.txt` in your current directory and its subdirectories, you can use the `find` command combined with `mv` (move) within a shell loop. Here is the command:
>
> ```sh
> find . -type f -name '*.csv' -exec sh -c 'mv "$0" "${0%.csv}.txt"' {} \;
> ```
>
> This command will look for all files ending with `.csv` from the current directory downwards recursively and rename each one to the same name but with a `.txt` extension.
