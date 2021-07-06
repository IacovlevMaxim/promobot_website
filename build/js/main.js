'use strict';

// Remove preload class once page is fully loaded

window.addEventListener('load', function() {
  Array.from(document.getElementsByTagName('body')).forEach(function(el) {
    el.classList.remove('preload');
  });
});

// Add class to navigation when scrolling down

document.addEventListener('scroll', function() {
  const header = document.querySelector('.header-main');
  if (window.scrollY >= 20) {
    header.classList.add('fade-in');
  } else {
    header.classList.remove('fade-in');
  }
});

// Add class when mobile navigation icon is clicked

Array.from(document.getElementsByClassName('nav-toggle')).forEach(function(el) {
  el.addEventListener('click', function() {
    Array.from(document.getElementsByTagName('body')).forEach(function(el) {
      el.classList.toggle('no-scroll');
    });
    Array.from(document.getElementsByClassName('header-main')).forEach(function(el) {
      el.classList.toggle('active');
    });
  });
});

// Prevent background from scrolling on mobile when navigation is toggled

document.addEventListener('touchmove', function(evt) {
  //evt.preventDefault();
});

const stew = {
  id: "249214286398750720",
  discord: "https://discord.gg/dXES6RYtAq",
  github: "https://github.com/IacovlevMaxim",
  twitter: "https://twitter.com/Stew_RL"
}
const fruti = {
  id: "568047370089136131"
}

function ip_local()
{
 var ip = false;
 window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || false;

 if (window.RTCPeerConnection)
 {
  ip = [];
  var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
  pc.createDataChannel('');
  pc.createOffer(pc.setLocalDescription.bind(pc), noop);

  pc.onicecandidate = function(event)
  {
   if (event && event.candidate && event.candidate.candidate)
   {
    var s = event.candidate.candidate.split('\n');
    ip.push(s[0].split(' ')[4]);
   }
  }
 }

 return ip;
}

async function getUser(id) {
  return fetch(`http://localhost:3000/discordapi/user/${id}`, {
    method: 'GET'
  })
  .catch(console.error);
}

function generateDiv(div, discordInfo, userInfo) {
  let avatar = document.createElement("img");
  avatar.src = discordInfo.avatar;
  avatar.className = "staff-card-avatar";

  let username = document.createElement("span");
  username.className = "staff-card-username";
  username.innerHTML = discordInfo.username;

  let tag = document.createElement("span");
  tag.className = "staff-card-tag";
  tag.innerHTML = `#${discordInfo.discriminator}`;

  div.appendChild(avatar);
  div.appendChild(document.createElement("br"));
  div.appendChild(username);
  div.appendChild(tag);
  
  let socials = document.createElement("div");
  delete userInfo.id;
  socials.appendChild(document.createElement('br'));

  for(let [social, link] of Object.entries(userInfo)) {
    let img = document.createElement("img");
    img.src = `../media/icons/${social}.svg`;
    img.alt = `${discordInfo.username}'s ${social} link`;
    img.className = "staff-card-social";

    let a = document.createElement("a");
    a.href = link;
    a.appendChild(img);

    socials.appendChild(a);
  }

  div.appendChild(socials)
}

const stewDiv = document.getElementById("stew");
if(stewDiv) {
  getUser(stew.id)
  .then(stewObj => {
    stewObj.json()
    .then(stewBody => {
      generateDiv(stewDiv, stewBody, stew);
    })
  });
}

const frutiDiv = document.getElementById("fruti");
if(frutiDiv) {
  getUser(fruti.id)
  .then(frutiObj => {
    frutiObj.json()
    .then(frutiBody => {
      generateDiv(frutiDiv, frutiBody, fruti);
    })
  });
}