![github repo badge: frontend](https://img.shields.io/badge/Frontend-Expo-black) ![github repo badge: backend](https://img.shields.io/badge/Backend-Flask-white) ![github repo badge: css](https://img.shields.io/badge/Backend-NextJS-blue) ![github repo badge: api](https://img.shields.io/badge/API-Clip-purple) ![github repo badge: css](https://img.shields.io/badge/CSS-TailwindCSS-blue) 

# BinBuddy

BinBuddy is an iOS / Android app which utilizes [OpenAI's CLIP](https://openai.com/research/clip) to help you determine how to properly recycle different types of waste just from a single photo.

Once BinBuddy identifies the item and the material it's made of, it provides you with information on how to recycle or dispose of it correctly.

Currently, BinBuddy's knowledge base is limited to information for Brookhaven, NY. However, by contributing to this GitHub repository, community members can contribute up-to-date information on how to recycle different types of waste in their own communities.

# Inspiration

A common problem we often run into in our lives is how to recycle properly. In schools, we're always told to recycle to contribute to a more sustainable future, but we're never told how.

This is due to the often convoluted rules for recycling different items. Recycling a plastic bottle is simple enough, but it's not like we recycle a computer or phone every day. So, when recycling is necessary, we either don't know how or don't even realize we can.

With BinBuddy, we aimed to resolve this issue by making it easy for users to recycle appropriately with by simply taking a photo of the object they want to recycle with their phone.

# Challenges and Lessons

To be honest, BinBuddy has been a bit of an ambitious project on our part. We had never used computer vision software before, and we were unsure if we could even create a backend that would allow us to use this vision on our phones.

Luckily, we were able to figure using the computer vision part out quickly. However, with this came another problem. The actual accuracy of the program and how the labels were given.

While we weren't able to get the program to detect all types of recyclable materials, we were proud that it got the most common household recyclables and even some of the more challenging objects like Windows vs. Apple devices with high accuracy. We can also identify objects that can be donated (such as clothing and eye glasses), objects that can be composted, and even prescription drugs that can be return through take-back programs.

Besides problems with the backend of BinBuddy, we were surprised with how much time was spent adjusting the UI and creating the look of the application as well. One would think that once the buttons were functional, that would be the end of it. However, we soon learned that we've been taking the "smoothness" surrounding most apps for granted. We went through several drafts for the logo, splash screen, articles, and the other assets found in BinBuddy until we created the final product. We're proud of this final product and its clean look as we put an immense amount of effort and thought into making it as professional as possible.

# Future Visions For BinBuddy

When it comes to the future of BinBuddy, there are several things that we wish we could've done if not for the time limit of 48 hours. The identification system isn't completely perfect in its current form. It still makes some mistakes and sometimes requires the user to retake the photo from a different angle. To improve this, it would be nice to produce and train a specific machine-learning model for recyclables.

Following improvements in the accuracy and capabilities of the model, we hope to optimize the program for use and possibly even integration with the default camera apps in both iOS and Android devices.

This would not only make BinBuddy more convenient to use for people but also would help the planet move in a more sustainable direction.

# Technical Details

BinBuddy is split into three separate components:
- Frontend: The frontend is written in React Native and Expo. It is responsible for the UI and user interaction.
- Backend: The backend is written in Python and Flask. It utilizes [HuggingFace Transformers](https://huggingface.co/transformers/) to run the CLIP model, processing images and returning the results to the frontend.
- Knowledge Base: The knowledge base uses Next.js and Tailwind CSS to render Markdown files containing information on how to recycle different types of waste. This content can be found in the `content/content/pages` directory.

Currently, we do not have a production build of any of these components. However, if you are feeling adventurous, you can run the frontend and backend locally:
- Frontend: `cd frontend && npm install && npx expo start`
    - You will need to install the Expo Go app on your phone. Then, scan the QR code in the terminal to run the app on your phone.
    - You will also need to modify the `BACKEND_URL` and `KB_URL` variables in `frontend/constants.ts` to point to your local backend and knowledge base.
- Backend: `cd backend && pip install -r requirements.txt && flask --app server run --host=0.0.0.0`
    - This may take a while to start up as the CLIP model needs to be downloaded.
- Knowledge Base: `cd content && npm install && npm run dev`
    - You can view the knowledge base at `localhost:3000`
