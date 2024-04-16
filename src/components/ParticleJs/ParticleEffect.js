'use client'
import React, { useEffect, useState } from 'react';
import 'particles.js/particles';
const particlesJS = window.particlesJS;

const ParticleEffect = ({ selectedEffect }) => {
  const [currentEffect, setCurrentEffect] = useState(null);

  useEffect(() => {
    // Stop the current effect when the component unmounts
    return () => {
      if (currentEffect) {
        currentEffect.fn('destroy');
      }
    };
  }, [currentEffect]);

  useEffect(() => {
    // Start the selected effect when the component mounts or when selectedEffect changes
    if (selectedEffect) {
      const effect = startEffect(selectedEffect);
      setCurrentEffect(effect);
    }
  }, [selectedEffect]);

  const startEffect = (effect) => {


    const config = getEffectConfig(effect);
    return particlesJS('particle-container', config);

  };

  const getEffectConfig = (effect) => {
    switch (effect) {
      case 'web':
        return {
          "particles": {
            "number": {
              "value": 150, // Reduced number of particles for a less dense web
              "density": {
                "enable": true,
                "value_area": 1000 // Increased area per particle
              }
            },
            "color": {
              "value": "#ffffff" // White color for the web
            },
            "shape": {
              "type": "circle"
            },
            "opacity": {
              "value": 0.5,
              "random": false
            },
            "size": {
              "value": 3,
              "random": true
            },
            "line_linked": {
              "enable": true,
              "distance": 100, // Decreased distance to create a more web-like structure
              "color": "#ffffff", // White color for the web lines
              "opacity": 0.6, // Increased opacity for better visibility
              "width": 2 // Thicker lines to resemble a web
            },
            "move": {
              "enable": true,
              "speed": 1, // Reduced speed for less movement
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false // Disabled hover effects to minimize movement
              },
              "onclick": {
                "enable": false // Disabled click effects to maintain the web structure
              },
              "resize": true
            }
          },
          "retina_detect": true
        };
      case 'rain':
            return {
              "particles": {
                "number": {
                  "value": 150, // Increase the number for denser rain
                  "density": {
                    "enable": true,
                    "value_area": 800 // Standard density
                  }
                },
                "color": {
                  "value": "#86d1f4" // Light blue for a water-like color
                },
                "shape": {
                  "type": "circle", // While we aim for a droplet shape, 'circle' provides a smoother appearance
                  "stroke": {
                    "width": 0
                  }
                },
                "opacity": {
                  "value": 0.6, // Slightly transparent to mimic water
                  "random": false
                },
                "size": {
                  "value": 4, // Smaller for a finer rain effect
                  "random": true,
                  "anim": {
                    "enable": false
                  }
                },
                "line_linked": {
                  "enable": false // Disable linking to avoid unnatural effects
                },
                "move": {
                  "enable": true,
                  "speed": 20, // Faster to simulate raindrop fall
                  "direction": "bottom",
                  "random": true, // Adds slight horizontal drift to the raindrops
                  "straight": true, // Allows for more natural, varied movement
                  "out_mode": "out", // Raindrops disappear after falling out of the canvas
                  "bounce": false,
                  "attract": {
                    "enable": false
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false // Disabling hover effects for a continuous rain effect
                  },
                  "onclick": {
                    "enable": false // Disabling click effects to maintain immersion
                  },
                  "resize": true // Ensure rain adapts to canvas size changes
                }
              },
              "retina_detect": true
            };
      case 'snow':
            return {
              "particles": {
                "number": {
                  "value": 100,
                  "density": {
                    "enable": true,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": "#ffffff"
                },
                "shape": {
                  "type": ["circle", "edge"], // Use a mix of circles and edges to simulate variability in snowflakes
                  "stroke": {
                    "width": 0
                  }
                },
                "opacity": {
                  "value": 0.8, // Slightly more opaque for better visibility against varied backgrounds
                  "random": true, // Random opacity to simulate depth
                  "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.3, // Ensure flakes are always somewhat visible
                    "sync": false
                  }
                },
                "size": {
                  "value": 5,
                  "random": true, // Snowflakes vary in size
                  "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 2, // Minimum size to keep flakes visible
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": false
                },
                "move": {
                  "enable": true,
                  "speed": 2, // Slightly faster to simulate falling snow
                  "direction": "bottom",
                  "random": true, // Random movement to simulate natural snowfall
                  "straight": false, // Allows for slight deviations in the fall path
                  "out_mode": "out", // Snowflakes disappear at the bottom
                  "bounce": false,
                  "attract": {
                    "enable": false
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false
                  },
                  "onclick": {
                    "enable": false
                  },
                  "resize": true
                }
              },
              "retina_detect": true
            };
      case 'stary':
        return {"particles":{"number":{"value":160,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
      case 'bubbles':
        return {
          "particles": {
            "number": {
              "value": 50, // Moderate amount of bubbles
              "density": {
                "enable": true,
                "value_area": 800 // Spacious distribution
              }
            },
            "color": {
              "value": ["#FFD700", "#FF69B4", "#00BFFF", "#32CD32", "#8A2BE2"] // Array of various bubble colors
            },
            "shape": {
              "type": "circle", // Bubble shape
              "stroke": {
                "width": 0 // No border for bubbles
              }
            },
            "opacity": {
              "value": 0.6, // Slightly transparent bubbles
              "random": true, // Random opacity for a popping effect
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1, // Bubbles pop in and out by changing opacity
                "sync": false
              }
            },
            "size": {
              "value": 10,
              "random": true, // Random bubble sizes
              "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 4, // Minimum size as bubbles pop
                "sync": false
              }
            },
            "line_linked": {
              "enable": false // No links between bubbles
            },
            "move": {
              "enable": true,
              "speed": 2, // Gentle movement speed
              "direction": "none",
              "random": true, // Random movement for a lively effect
              "straight": false,
              "out_mode": "out", // Bubbles pop out of view
              "bounce": false,
              "attract": {
                "enable": false
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false // Avoid interaction to maintain the calm flow
              },
              "onclick": {
                "enable": true,
                "mode": "repulse" // Bubbles move away on click for an interactive effect
              },
              "resize": true
            },
            "modes": {
              "repulse": {
                "distance": 200,
                "duration": 0.4
              }
            }
          },
          "retina_detect": true};
      case 'confetti':
        return {
          "particles": {
            "number": {
              "value": 100, // Adjusted for a balance between confetti and balloons
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"] // Festive colors
            },
            "shape": {
              "type": ["circle", "triangle", "edge"], // Adding triangles for varied confetti shapes
              "stroke": {
                "width": 0
              }
            },
            "opacity": {
              "value": 0.8,
              "random": false
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "speed": 3, // Slowing down for a gentle movement
              "direction": "top",
              "out_mode": "out",
              "bounce": false
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false
              },
              "onclick": {
                "enable": false
              },
              "resize": true
            }
          },
          "retina_detect": true
        };
        break;
      case 'newJeans':
        return {
          "particles": {
            "number": {
              "value": 100,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff" // Star color
            },
            "shape": {
              "type": "star",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.5,
              "random": true, // Random opacity for twinkling effect
              "anim": {
                "enable": true,
                "speed": 1, // Adjust for faster/slower twinkling
                "opacity_min": 0.1, // Minimum opacity to simulate twinkling
                "sync": false
              }
            },
            "size": {
              "value": 3, // Adjust size for larger/smaller stars
              "random": true, // Varying sizes for a more natural look
              "anim": {
                "enable": false
              }
            },
            "line_linked": {
              "enable": false // No linking lines between stars
            },
            "move": {
              "enable": false // Static stars, no movement
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false
              },
              "onclick": {
                "enable": false
              }
            }
          },
          "retina_detect": true
        }
        
        
;
      case 'aot':
        return {
          "particles": {
            "number": {
              "value": 50,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": ["#000000", "#a50000"] // Black and dark red
            },
            "shape": {
              "type": "polygon",
              "stroke": {
                "width": 0
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.5,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "enable": true,
              "speed": 10,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }
        case 'leaves':
  return {
    particles: {
      number: {
        value: 10,
        density: {
          enable: true,
          value_area: 800
        }
      },
      shape: {
        type: 'image',
        image: {
          src: 'https://media2.giphy.com/media/FhCW9YYWfI94flEmbw/giphy.webp?cid=ecf05e47rszry4kd23me8v4wp9xwazpcgga3xwckatovnzid&ep=v1_stickers_search&rid=giphy.webp&ct=s', // Replace with the path to your leaf image
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.7,
        random: false,
        anim: {
          enable: false
        }
      },
      size: {
        value: 20,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 10,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false
        }
      },
      rotate: {
        value: 0,
        random: true,
        direction: "clockwise",
        animation: {
          enable: true,
          speed: 5,
          sync: false
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
  };

          return {
            particles: {
              number: {
                value: 10,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              shape: {
                type: 'image',
                image: {
                  src: 'https://media2.giphy.com/media/FhCW9YYWfI94flEmbw/giphy.webp?cid=ecf05e47rszry4kd23me8v4wp9xwazpcgga3xwckatovnzid&ep=v1_stickers_search&rid=giphy.webp&ct=s', // Replace with the path to your leaf image
                  width: 200,
                  height: 200
                }
              },
              opacity: {
                value: 0.7,
                random: false,
                anim: {
                  enable: false
                }
              },
              size: {
                value: 20,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 10,
                  sync: false
                }
              },
              line_linked: {
                enable: false
              },
              move: {
                enable: true,
                speed: 2,
                direction: "bottom",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false
                },
                onclick: {
                  enable: false
                },
                resize: true
              }
            },
            retina_detect: true
          };
        
          case 'sunny':
            return {
              particles: {
                number: {
                  value: 5,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                },
                color: {
                  value: "#ADD8E6" // Sun color
                },
                shape: {
                  type: 'circle', // Simple circles to represent the sun; consider 'image' for more detailed particles
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 10,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 10,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: false
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: false
                  },
                  onclick: {
                    enable: false
                  },
                  resize: true
                }
              },
              retina_detect: true
            };
          
      default:
        return {};
    }
  };
  
  return <div style={{background:'transparent'}} id="particle-container"></div>;
};

export default ParticleEffect;
