
# ☀️ PWA energy solution made with ❤️ with Nuxt.js, tailwindcss, Flask, PyTorch

# Team Unstoppables [UIA413]: UNESCO India Africa Hackathon 2022
## 🏆 WINNING SOLUTION IN UNESCO INDIA AFRICA HACKATHON 2022 🏆
## Theme: Energy
### Problem Statement Title
App to calculate rooftop area and reflectance from satellite data and estimate saving in electrical units as cooling load decrease by increasing the roof top reflectance by painting it white.
### Problem Description
As you will be aware that white roof can make a huge difference in your home temperature and energy savings by reducing the cooling load. Can we develop a app which can give/calculate the area and current reflectance of rooftop of the building based on geo-location and satellite imagery? And also estimate the saving in electrical units (based on change in reflectance) as cooling load decreases by increasing the roof top reflectance by painting it white.(Solar insolation based on time, day location and season should also be considered)

---
## Our Solution

We worked on a progressive web application to calculate the rooftop area based on the user's location (based on GPS, coordinates, and address). To approach this problem, we started by performing semantic segmentation of rooftops from the satellite images from the Google Maps API. The identified rooftops were numbered and later selected by the user for further computations. We calculated the area of the polygon plotted over the image. After that, we used this area to figure out how much heat the roof absorbed from the sun's rays (using solar irradiance). These calculations included factors such as the reflectance based on the color and material of the roof, the current temperature, wind speed, and season. The data was finally used to calculate the energy required by the air conditioner to cool the room, considering the heat transfer from the rooftop.
The app made at the UNESCO India Africa Hackathon in 2022 works on Android and iOS and can also be used as a desktop client. We achieved this through the flexibility offered by progressive web applications. We used a state-of-the-art algorithm to segment rooftops with a mean IoU of 79.82 on the INRIA Dataset.


This project was selected as the best project by the evaluators, and we were awarded as the winning team by the Vice President of India and the Minister of Education of India for the UNESCO India Africa Hackathon 2022.

## Technical Stack
- **Interface:** Vue.js/Nuxt3
- **Back-End:** Flask
- **AI:** PyTorch
- **DIP:** OpenCV, Scikit-Image

## Team Members
Ashish Papanai, Utkarsha Ramchandra Nehe, Bah Aly Dembele, Alexis Yehadji, Anushka Agarwal, Rejoice Tiwahlani Banda


&copy; 2022 | Team Unstoppables


## Run Locally

Clone the project


Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```


## Demo

### Mobile PWA
Home | Calculate Savings screen | Select Roof screen |
--- | --- | --- |
<img src="https://github.com/al-alec/look4job_portal/blob/master/assets/index.jpg" data-canonical-src="https://github.com/al-alec/look4job_portal/blob/master/assets/index.jpg" width="100%" height="100%" /> | <img src="https://github.com/al-alec/look4job_portal/blob/master/assets/login_mobile.jpg" data-canonical-src="https://github.com/al-alec/look4job_portal/blob/master/assets/login_mobile.jpg" width="100%" height="100%" /> | <img src="https://github.com/al-alec/look4job_portal/blob/master/assets/password.jpg" width="100%" height="100%" /> |

| Results screen |
| --- |
| <img src="https://github.com/al-alec/look4job_portal/blob/master/assets/cv.jpg" data-canonical-src="https://github.com/al-alec/look4job_portal/blob/master/assets/cv.jpg" width="100%" height="100%" /> |

### Desktop
Home |
--- |
<img src="https://github.com/al-alec/look4job_portal/blob/master/assets/home.png" width="100%" height="100%" /> |

Calculate Savings screen |
--- |
<img src="https://github.com/al-alec/look4job_portal/blob/master/assets/login.png" width="100%" height="100%" /> |

Select Roof screen |
--- |
<img src="https://github.com/al-alec/look4job_portal/blob/master/assets/password.png" width="100%" height="100%" /> |

Results screen |
--- |
<img src="https://github.com/al-alec/look4job_portal/blob/master/assets/cv.png" width="100%" height="100%" /> |
