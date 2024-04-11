---
title: 'Discover NYC: An AR exploration app'
roles: ['Design']
year: 2022
description: How can we use AR and crowdsourced sentiment analysis to help people explore new cities? A hackathon project for Columbia DevFest 2022. 
num: 02
image: "/images/nyc/nyc-thumbnail.png"
---

### Newcomers to NYC are unfamiliar with their surroundings and want recommendations on the best places to go

As college freshmen living in NYC for the first time, my friends and I wanted to know what were the best places to go for food, arts, entertainment, etc. But we didn't want to just go to the places with the most reviews, in case they were too touristy — we wanted to go where the locals were going. And rather than going straight from point A to B, we wanted a more immersive form of navigation that still left some freedom for wandering and exploration.

&nbsp;

![alt text](/images/nyc/nyc-flow.png)
##### App flow

#### How can we explore a new city more immersively?
### AR navigation for guided wandering

When I used traditional navigation apps to go from point A to B, I didn't actually feel very immersed in NYC: I only looked at my surroundings to make sure I was following the little blue line on my screen. And I had no information about any nearby POI that weren't along my exact route: if there was a cool cafe only half a block away, I wouldn't know about it. Using the camera view to navigate provides space for more visual information about the user's surroundings. Specifically, POI appear as markers scaled based on proximity. If users are en route to a specific location, they can still get information about nearby POI, even if it's not along their direct route. 

&nbsp;

![alt text](/images/nyc/nyc-nav.png)
##### Navigation screen with augmented-reality view showing nearby POI

#### How can we leverage locals' insights to get recommendations on where to go?
### Crowdsourced sentiment analysis for POI recommendation

At the time, Twitter (now X) was a platform that was more likely to capture data from locals rather than tourists, and it had an accessible API where developers could easily pull Tweets for analysis. For the hackathon, I created a simple algorithm using the Twitter API that pulled Tweets on POI around Columbia University, classified the Tweet sentiments as positive or negative, and graphed the changes in sentiment over time. 

&nbsp;

![alt text](/images/nyc/nyc-poi.png)
##### POI card summarizing online sentiment

![alt text](/images/nyc/nyc-poi-ex.png)
##### Expanded POI card with trend report

![alt text](/images/nyc/nyc-filter.png)
##### Users can filter POI based on their preferences

### New digital interaction paradigms like AR and VR should make us feel more connected, not more distant

AR and VR have already been widely adopted as forms of escapism. But how can we integrate this technology into intentional designs that bring us closer to the world we already have?