Note: this is my clone repository base on M4TT72 - Thanks!!

## My Quick Start

### Using docker (recommended)

```bash
docker run -d --name terminal -p 3000:3000 hlavaceklab/terminal
```

If you want to run with custom configuration, make sure you have a copy of `config.json` then mount in the container:

```bash
docker run -d \
  --name terminal \
  -p 3000:3000 \
  -v `pwd`/config.json:/data/config.json \
  hlavaceklab/terminal
```

## Configuration

Here's a sample of the `config.json` file:

```json
{
  "bioUrl": "https://raw.githubusercontent.com/martinhlavacek/martinhlavacek/master/README.md",
  "social": {
    "github": "martinhlavacek",
    "linkedin": "martinhlavacek"
  },
  "theme": "cobaltneon",
  "border": true
}
```

### Using npm/yarn

1. Install dependencies:

```bash
yarn install
```
2. Run the dev:

```bash
yarn dev
```

3. Build the project:

```bash
yarn build
```

4. Run the server:

```bash
yarn start
```

---

# [M4TT72 | Terminal](https://term.m4tt72.com)

A terminal style website

![screenshot](/docs/screenshot.png)

## why?

TL;DR: why not?

I'm a Linux enthusiast, and I tried creating something that will allow 'normal' people to have a glimpse at my world.

## Quick Start

### Using docker (recommended)

```bash
docker run -d --name terminal -p 3000:3000 m4tt72/terminal
```

If you want to run with custom configuration, make sure you have a copy of `config.json` then mount in the container:

```bash
docker run -d \
  --name terminal \
  -p 3000:3000 \
  -v `pwd`/config.json:/data/config.json \
  m4tt72/terminal
```

### Using npm/yarn

1. Install dependencies:

```bash
yarn install
```

2. Build the project:

```bash
yarn build
```

3. Run the server:

```bash
yarn start
```

## Configuration

Here's a sample of the `config.json` file:

```json
{
  "bioUrl": "https://raw.githubusercontent.com/m4tt72/m4tt72/master/README.md",
  "social": {
    "instagram": "m4tt72",
    "github": "m4tt72",
    "linkedin": "yassinefathi"
  },
  "theme": "gruvboxdark" // list of themes available in themes.json
}
```

## Themes

![themes](/docs/screenshot.gif)

[Here's](/docs/themes) a list of available themes.


## Contributing

Please feel free to pull requests or log issues.

Thanks!
