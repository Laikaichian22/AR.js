!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("aframe"),require("three")):"function"==typeof define&&define.amd?define(["aframe","three"],e):"object"==typeof exports?exports.ARjs=e(require("aframe"),require("three")):t.ARjs=e(t.AFRAME,t.THREE)}(this,((t,e)=>(()=>{var i={254:function(t,e,i){var o;o=t=>(()=>{"use strict";var e={381:e=>{e.exports=t}},i={};function o(t){var n=i[t];if(void 0!==n)return n.exports;var s=i[t]={exports:{}};return e[t](s,s.exports,o),s.exports}o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{o.r(n),o.d(n,{DeviceOrientationControls:()=>l,LocationBased:()=>i,WebcamRenderer:()=>s});class t{constructor(){this.EARTH=40075016.68,this.HALF_EARTH=20037508.34}project(t,e){return[this.lonToSphMerc(t),this.latToSphMerc(e)]}unproject(t){return[this.sphMercToLon(t[0]),this.sphMercToLat(t[1])]}lonToSphMerc(t){return t/180*this.HALF_EARTH}latToSphMerc(t){return Math.log(Math.tan((90+t)*Math.PI/360))/(Math.PI/180)*this.HALF_EARTH/180}sphMercToLon(t){return t/this.HALF_EARTH*180}sphMercToLat(t){var e=t/this.HALF_EARTH*180;return 180/Math.PI*(2*Math.atan(Math.exp(e*Math.PI/180))-Math.PI/2)}getID(){return"epsg:3857"}}var e=o(381);class i{constructor(e,i,o={}){this._scene=e,this._camera=i,this._proj=new t,this._eventHandlers={},this._lastCoords=null,this._gpsMinDistance=0,this._gpsMinAccuracy=100,this._maximumAge=0,this._watchPositionId=null,this.setGpsOptions(o)}setProjection(t){this._proj=t}setGpsOptions(t={}){void 0!==t.gpsMinDistance&&(this._gpsMinDistance=t.gpsMinDistance),void 0!==t.gpsMinAccuracy&&(this._gpsMinAccuracy=t.gpsMinAccuracy),void 0!==t.maximumAge&&(this._maximumAge=t.maximumAge)}startGps(t=0){return null===this._watchPositionId&&(this._watchPositionId=navigator.geolocation.watchPosition((t=>{this._gpsReceived(t)}),(t=>{this._eventHandlers.gpserror?this._eventHandlers.gpserror(t.code):alert(`GPS error: code ${t.code}`)}),{enableHighAccuracy:!0,maximumAge:0!=t?t:this._maximumAge}),!0)}stopGps(){return null!==this._watchPositionId&&(navigator.geolocation.clearWatch(this._watchPositionId),this._watchPositionId=null,!0)}fakeGps(t,e,i=null,o=0){null!==i&&this.setElevation(i),this._gpsReceived({coords:{longitude:t,latitude:e,accuracy:o}})}lonLatToWorldCoords(t,e){const i=this._proj.project(t,e);return[i[0],-i[1]]}add(t,e,i,o){this.setWorldPosition(t,e,i,o),this._scene.add(t)}setWorldPosition(t,e,i,o){const n=this.lonLatToWorldCoords(e,i);[t.position.x,t.position.z]=n,void 0!==o&&(t.position.y=o)}setElevation(t){this._camera.position.y=t}on(t,e){this._eventHandlers[t]=e}_gpsReceived(t){let e=Number.MAX_VALUE;t.coords.accuracy<=this._gpsMinAccuracy&&(null===this._lastCoords?this._lastCoords={latitude:t.coords.latitude,longitude:t.coords.longitude}:e=this._haversineDist(this._lastCoords,t.coords),e>=this._gpsMinDistance&&(this._lastCoords.longitude=t.coords.longitude,this._lastCoords.latitude=t.coords.latitude,this.setWorldPosition(this._camera,t.coords.longitude,t.coords.latitude),this._eventHandlers.gpsupdate&&this._eventHandlers.gpsupdate(t,e)))}_haversineDist(t,i){const o=e.Math.degToRad(i.longitude-t.longitude),n=e.Math.degToRad(i.latitude-t.latitude),s=Math.sin(n/2)*Math.sin(n/2)+Math.cos(e.Math.degToRad(t.latitude))*Math.cos(e.Math.degToRad(i.latitude))*(Math.sin(o/2)*Math.sin(o/2));return 2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))*6371e3}}class s{constructor(t,i){let o;this.renderer=t,this.renderer.autoClear=!1,this.sceneWebcam=new e.Scene,void 0===i?(o=document.createElement("video"),o.setAttribute("autoplay",!0),o.setAttribute("playsinline",!0),o.style.display="none",document.body.appendChild(o)):o=document.querySelector(i),this.geom=new e.PlaneBufferGeometry,this.texture=new e.VideoTexture(o),this.material=new e.MeshBasicMaterial({map:this.texture});const n=new e.Mesh(this.geom,this.material);if(this.sceneWebcam.add(n),this.cameraWebcam=new e.OrthographicCamera(-.5,.5,.5,-.5,0,10),navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const t={video:{width:1280,height:720,facingMode:"environment"}};navigator.mediaDevices.getUserMedia(t).then((t=>{console.log("using the webcam successfully..."),o.srcObject=t,o.play()})).catch((t=>{setTimeout((()=>{this.createErrorPopup("Webcam Error\nName: "+t.name+"\nMessage: "+t.message)}),1e3)}))}else setTimeout((()=>{this.createErrorPopup("sorry - media devices API not supported")}),1e3)}update(){this.renderer.clear(),this.renderer.render(this.sceneWebcam,this.cameraWebcam),this.renderer.clearDepth()}dispose(){this.material.dispose(),this.texture.dispose(),this.geom.dispose()}createErrorPopup(t){if(!document.getElementById("error-popup")){var e=document.createElement("div");e.innerHTML=t,e.setAttribute("id","error-popup"),document.body.appendChild(e)}}}const a=new e.Vector3(0,0,1),r=new e.Euler,c=new e.Quaternion,d=new e.Quaternion(-Math.sqrt(.5),0,0,Math.sqrt(.5)),h={type:"change"};class l extends e.EventDispatcher{constructor(t){super(),!1===window.isSecureContext&&console.error("THREE.DeviceOrientationControls: DeviceOrientationEvent is only available in secure contexts (https)");const i=this,o=new e.Quaternion;this.object=t,this.object.rotation.reorder("YXZ"),this.enabled=!0,this.deviceOrientation={},this.screenOrientation=0,this.alphaOffset=0,this.TWO_PI=2*Math.PI,this.HALF_PI=.5*Math.PI,this.orientationChangeEventName="ondeviceorientationabsolute"in window?"deviceorientationabsolute":"deviceorientation",this.smoothingFactor=1;const n=function(t){i.deviceOrientation=t},s=function(){i.screenOrientation=window.orientation||0};this.connect=function(){s(),void 0!==window.DeviceOrientationEvent&&"function"==typeof window.DeviceOrientationEvent.requestPermission?window.DeviceOrientationEvent.requestPermission().then((t=>{"granted"===t&&(window.addEventListener("orientationchange",s),window.addEventListener(i.orientationChangeEventName,n))})).catch((function(t){console.error("THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:",t)})):(window.addEventListener("orientationchange",s),window.addEventListener(i.orientationChangeEventName,n)),i.enabled=!0},this.disconnect=function(){window.removeEventListener("orientationchange",s),window.removeEventListener(i.orientationChangeEventName,n),i.enabled=!1},this.update=function(){if(!1===i.enabled)return;const t=i.deviceOrientation;if(t){let n=t.alpha?e.Math.degToRad(t.alpha)+i.alphaOffset:0,s=t.beta?e.Math.degToRad(t.beta):0,l=t.gamma?e.Math.degToRad(t.gamma):0;const u=i.screenOrientation?e.Math.degToRad(i.screenOrientation):0;if(this.smoothingFactor<1){if(this.lastOrientation){const t=this.smoothingFactor;n=this._getSmoothedAngle(n,this.lastOrientation.alpha,t),s=this._getSmoothedAngle(s+Math.PI,this.lastOrientation.beta,t),l=this._getSmoothedAngle(l+this.HALF_PI,this.lastOrientation.gamma,t,Math.PI)}else s+=Math.PI,l+=this.HALF_PI;this.lastOrientation={alpha:n,beta:s,gamma:l}}!function(t,e,i,o,n){r.set(i,e,-o,"YXZ"),t.setFromEuler(r),t.multiply(d),t.multiply(c.setFromAxisAngle(a,-n))}(i.object.quaternion,n,this.smoothingFactor<1?s-Math.PI:s,this.smoothingFactor<1?l-this.HALF_PI:l,u),8*(1-o.dot(i.object.quaternion))>1e-6&&(o.copy(i.object.quaternion),i.dispatchEvent(h))}},this._orderAngle=function(t,e,i=this.TWO_PI){return e>t&&Math.abs(e-t)<i/2||t>e&&Math.abs(e-t)>i/2?{left:t,right:e}:{left:e,right:t}},this._getSmoothedAngle=function(t,e,i,o=this.TWO_PI){const n=this._orderAngle(t,e,o),s=n.left,a=n.right;n.left=0,n.right-=s,n.right<0&&(n.right+=o);let r=a==e?(1-i)*n.right+i*n.left:i*n.right+(1-i)*n.left;return r+=s,r>=o&&(r-=o),r},this.dispose=function(){i.disconnect()},this.connect()}}})(),n})(),t.exports=o(i(381))},223:e=>{"use strict";e.exports=t},381:t=>{"use strict";t.exports=e}},o={};function n(t){var e=o[t];if(void 0!==e)return e.exports;var s=o[t]={exports:{}};return i[t].call(s.exports,s,s.exports,n),s.exports}n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};return(()=>{"use strict";n.r(s);var t=n(223),e=n(381);t.registerComponent("arjs-webcam-texture",{init:function(){this.scene=this.el.sceneEl,this.texCamera=new e.OrthographicCamera(-.5,.5,.5,-.5,0,10),this.texScene=new e.Scene,this.scene.renderer.autoClear=!1,this.video=document.createElement("video"),this.video.setAttribute("autoplay",!0),this.video.setAttribute("playsinline",!0),this.video.setAttribute("display","none"),document.body.appendChild(this.video),this.geom=new e.PlaneBufferGeometry,this.texture=new e.VideoTexture(this.video),this.material=new e.MeshBasicMaterial({map:this.texture});const t=new e.Mesh(this.geom,this.material);this.texScene.add(t)},play:function(){if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const t={video:{facingMode:"environment"}};navigator.mediaDevices.getUserMedia(t).then((t=>{this.video.srcObject=t,this.video.play()})).catch((t=>{this.el.sceneEl.systems.arjs._displayErrorPopup(`Webcam error: ${t}`)}))}else this.el.sceneEl.systems.arjs._displayErrorPopup("sorry - media devices API not supported")},tick:function(){this.scene.renderer.clear(),this.scene.renderer.render(this.texScene,this.texCamera),this.scene.renderer.clearDepth()},pause:function(){this.video.srcObject.getTracks().forEach((t=>{t.stop()}))},remove:function(){this.material.dispose(),this.texture.dispose(),this.geom.dispose()}});var i=n(254);t.registerComponent("gps-new-camera",{schema:{simulateLatitude:{type:"number",default:0},simulateLongitude:{type:"number",default:0},simulateAltitude:{type:"number",default:-Number.MAX_VALUE},gpsMinDistance:{type:"number",default:0},positionMinAccuracy:{type:"number",default:100},gpsTimeInterval:{type:"number",default:0}},init:function(){this._testForOrientationControls(),this.threeLoc=new i.LocationBased(this.el.sceneEl.object3D,this.el.object3D),this.threeLoc.on("gpsupdate",(t=>{this._currentPosition={longitude:t.coords.longitude,latitude:t.coords.latitude},this._sendGpsUpdateEvent(t.coords.longitude,t.coords.latitude)})),this.threeLoc.on("gpserror",(t=>{t>=1&&t<=3?this._displayError(["User denied access to GPS.","GPS satellites not available.","Timeout communicating with GPS satellites - try moving to a more open area."][t-1]):this._displayError(`Unknown geolocation error code ${t}.`)}));const t=this._isMobile();this.el.setAttribute("look-controls-enabled",!t),t&&this.el.setAttribute("arjs-device-orientation-controls",!0),navigator.userAgent.match(/Version\/[\d.]+.*Safari/)&&this._setupSafariOrientationPermissions(),this.el.sceneEl.addEventListener("gps-entity-place-added",(t=>{const e=t.detail.component.components["gps-new-entity-place"];this._currentPosition&&e.setDistanceFrom(this._currentPosition)}))},update:function(t){this.threeLoc.setGpsOptions({gpsMinAccuracy:this.data.positionMinAccuracy,gpsMinDistance:this.data.gpsMinDistance,maximumAge:this.data.gpsTimeInterval}),0===this.data.simulateLatitude&&0===this.data.simulateLongitude||this.data.simulateLatitude==t.simulateLatitude&&this.data.simulateLongitude==t.simulateLongitude||(this.threeLoc.stopGps(),this.threeLoc.fakeGps(this.data.simulateLongitude,this.data.simulateLatitude),this.data.simulateLatitude=0,this.data.simulateLongitude=0),this.data.simulateAltitude>-Number.MAX_VALUE&&this.threeLoc.setElevation(this.data.simulateAltitude+1.6)},play:function(){0===this.data.simulateLatitude&&0===this.data.simulateLongitude&&this.threeLoc.startGps()},pause:function(){this.threeLoc.stopGps()},latLonToWorld:function(t,e){return this.threeLoc.lonLatToWorldCoords(e,t)},_sendGpsUpdateEvent:function(t,e){this.el.emit("gps-camera-update-position",{position:{longitude:t,latitude:e}})},_testForOrientationControls:function(){this.el.components["arjs-device-orientation-controls"]||this.el.components["look-controls"]||this._displayError("WARNING - No orientation controls component, app will not respond to device rotation.")},_displayError:function(t){const e=this.el.sceneEl.systems.arjs;e?e._displayErrorPopup(t):alert(t)},_setupSafariOrientationPermissions:function(){if("function"==typeof window.DeviceOrientationEvent?.requestPermission){var t=function(){console.log("Requesting device orientation permissions..."),DeviceOrientationEvent.requestPermission(),document.removeEventListener("touchend",t)};document.addEventListener("touchend",(function(){t()}),!1),this.el.sceneEl.systems.arjs._displayErrorPopup("After camera permission prompt, please tap the screen to activate geolocation.")}else{var e=setTimeout((()=>{this.el.sceneEl.systems.arjs._displayErrorPopup("Please enable device orientation in Settings > Safari > Motion & Orientation Access.")}),750);window.addEventListener("deviceorientation",(function(){clearTimeout(e)}),{once:!0})}},_isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}}),t.registerComponent("gps-new-entity-place",{schema:{longitude:{type:"number",default:0},latitude:{type:"number",default:0}},init:function(){const t=document.querySelector("[gps-new-camera]");t.components["gps-new-camera"]?(this._cameraGps=t.components["gps-new-camera"],t.addEventListener("gps-camera-update-position",(t=>{this.distance=this._haversineDist(t.detail.position,this.data)})),this.el.sceneEl.emit("gps-entity-place-added",{component:this.el})):console.error("gps-new-camera not initialised")},update:function(){const t=this._cameraGps.threeLoc.lonLatToWorldCoords(this.data.longitude,this.data.latitude);this.el.object3D.position.set(t[0],this.el.object3D.position.y,t[1])},setDistanceFrom:function(t){this.distance=this._haversineDist(t,this.data)},_haversineDist:function(t,i){const o=e.Math.degToRad(i.longitude-t.longitude),n=e.Math.degToRad(i.latitude-t.latitude),s=Math.sin(n/2)*Math.sin(n/2)+Math.cos(e.Math.degToRad(t.latitude))*Math.cos(e.Math.degToRad(i.latitude))*(Math.sin(o/2)*Math.sin(o/2));return 2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))*6371e3}}),t.registerComponent("arjs-device-orientation-controls",{schema:{smoothingFactor:{type:"number",default:1}},init:function(){this._orientationControls=new THREEx.DeviceOrientationControls(this.el.object3D)},update:function(){this._orientationControls.smoothingFactor=this.data.smoothingFactor},tick:function(){this._orientationControls.update()}})})(),s})()));