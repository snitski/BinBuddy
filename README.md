![github repo badge: frontend](https://img.shields.io/badge/Frontend-Expo-181717?color=blue) ![github repo badge: backend](https://img.shields.io/badge/Backend-Flask-181717?color=blue) ![github repo badge: api](https://img.shields.io/badge/API-Clip-181717?color=purple)

# BinBuddy

BinBuddy utilizes OpenAI's CLIPAI to help you determine how to properly recycle different types of waste just from a single photo.

Once BinBuddy identifies the item and the material it's made of, it provides you with information on how to recycle it correctly.

BinBuddy's machine learning algorithms learn from user input. This ensures the app provides accurate and up-to-date information on how to recycle waste properly, ultimately contributing to a more sustainable future.

# Inspiration

A common problem we often run into in our lives is how to recycle properly. In schools, we're always told to recycle to contribute to a more sustainable future, but we're never told how.

This is due to the various specific requirements for recycling different objects. How we should recycle a particular object is often confusing. After all, it's not like we recycle a computer or phone every day. So, when we have to, we either don't know how or don't even realize we can.

With BinBuddy, we aimed to resolve this issue by making it easy for users to recycle appropriately with just a photo.

# Challenges and Lessons

To be honest, BinBuddy had been a bit of an ambitious project on our part. We had never used computer vision software before, and we were unsure if we could even create a backend that would allow us to use this vision on our phones.

Luckily, we were able to figure using the computer vision part out quickly. However, with this came another problem. The actual accuracy of the program and how the labels were given.

While we weren't able to get the program to detect all types of recyclable materials, we were proud that it got the most common household recyclables and even some of the more challenging objects like Windows vs. Apple devices with high accuracy.

Besides problems with the backend of BinBuddy, we were surprised with how much time was spent adjusting the UI and creating the look of the application as well. One would think that once the buttons were functional, that would be the end of it. However, we soon learned that we've been taking the "smoothness" surrounding most apps for granted. We went through several drafts for the logo, splatter screen, articles, and the other assets found in BinBuddy until we created the final product. We're proud of this final product and its clean look as we put an immense amount of effort and thought into making it as professional as possible.

# Future Visions For BinBuddy

When it comes to the future of BinBuddy, there are several things that we wish we could've done if not for the time limit of 48 hours. The identification system isn't completely perfect in its current form. It still makes some mistakes and sometimes requires the user to retake the photo from a different angle. To improve this, it would be nice to produce and train a specific machine-learning model for recyclables.

Following the improvements in the accuracy of the model and what it's really capable of, we hope to optimize the program for use and integration with the default camera apps in both iOS and Android devices.

This would not only make BinBuddy more convenient to use for people but also would help the planet move in a more sustainable direction.
