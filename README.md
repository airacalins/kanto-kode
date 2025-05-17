# Welcome to your KantoKode 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Clone the repo

   ```bash
   git clone https://github.com/airacalins/kanto-kode.git
   cd kanto-kode
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```
4. Running the JSON Server

- This project uses a JSON server to mock the backend API.

- To start the JSON server, run this command in your project root:

   ```bash
   npx json-server db.json
   ```

You can run the app on:

- Android emulator

- iOS simulator (macOS only)

---


### Note

- If running on a physical device, make sure your computer and device are on the same network.

- Physical device using the Expo Go app (scan QR code)
---

### Important:
If running on a physical device, update the API URL in src/config/api.ts:
- Replace localhost with your computer's local IP address.
Find your computer's IP address with:

