var screen = document.getElementById("parent");
var preDiv = document.getElementById("rect");
var generatedHeights = [];
var divElements = [];
var defaulColor = "#01579b";
var comparingColor = "#ffff00";
var sortedColor = "#00c853";
let speed = 0;
window.onload = (event) => {
  onInputChange();
};

function onInputChange() {
  var val = document.getElementById("slider").value;
  const arrayLength = parseInt(val);
  speed = 1250 / val;
  console.log(speed);
  generatedHeights = [];
  for (var i = 0; i < val; i++) {
    generatedHeights.push(Math.floor(Math.random() * 200) + 10);
  }
  createBars(generatedHeights);
}
function createBars(arrayOfDivs) {
  const numWidth = Math.floor(
    screen.getBoundingClientRect().width / arrayOfDivs.length
  );
  screen.innerHTML = "";
  let preDivleft = 0;
  divElements = [];
  for (let index = 0; index < arrayOfDivs.length; index++) {
    var newDiv = document.createElement("div");
    newDiv.className = "bar";
    newDiv.id = "id" + index;
    newDiv.style.left = `${preDivleft}px`;
    newDiv.style.marginLeft = `${1}px`;
    newDiv.style.marginRight = `${1}px`;
    newDiv.style.width = `${numWidth}px`;
    const h = arrayOfDivs[index];
    newDiv.style.height = `${h * 3}px`;
    screen.appendChild(newDiv);
    divElements.push(newDiv);
    //adjust left for next div
    preDivleft = preDivleft + numWidth + 2;
  }
}

function swap(el1, el2) {
  return new Promise((resolve) => {
    var heighta = el1.style.height;
    var heightb = el2.style.height;
    setTimeout(() => {
      el1.style.height = heightb;
      el2.style.height = heighta;
      resolve();
    }, speed * 3);
  });
}

let keyColor = "red";
async function insertionSort() {
  for (let i = 1; i < divElements.length; i++) {
    var key = divElements[i];
    key.style.backgroundColor = keyColor;

    let j = i - 1;
    const keyHeight = parseInt(key.style.height, 10);
    let currentPosition = parseInt(divElements[j].style.height, 10);

    while (j >= 0 && keyHeight < currentPosition) {
      divElements[j + 1].style.backgroundColor = comparingColor;
      await swap(divElements[j + 1], divElements[j]);
      divElements[j + 1].style.backgroundColor = sortedColor;
      --j;
      if (j !== -1) currentPosition = parseInt(divElements[j].style.height, 10);
    }
    divElements[0].style.backgroundColor = sortedColor;
    key.style.backgroundColor = sortedColor;
    //await swap(divElements[j + 1], key);
  }
}

async function sort() {
  for (let i = 0; i < divElements.length - 1; i += 1) {
    let isSwaped = false;
    for (let j = 0; j < divElements.length - i - 1; j += 1) {
      divElements[j].style.backgroundColor = comparingColor;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      const value1 = parseInt(divElements[j].style.height, 10);
      const value2 = parseInt(divElements[j + 1].style.height, 10);

      if (value1 > value2) {
        await swap(divElements[j], divElements[j + 1]);
        isSwaped = true;
      }
      divElements[j].style.backgroundColor = defaulColor;
    }
    divElements[divElements.length - i - 1].style.backgroundColor = sortedColor;
    if (isSwaped) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });
    }
  }
  divElements[0].style.backgroundColor = sortedColor;
}

async function selectionSort() {
  for (let i = 0; i < divElements.length - 1; i++) {
    var smallestElement = divElements[i];
    for (let j = i + 1; j < divElements.length; j++) {
      const value1 = parseInt(smallestElement.style.height, 10);
      const value2 = parseInt(divElements[j].style.height, 10);

      divElements[j].style.backgroundColor = comparingColor;

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      if (value2 < value1) {
        smallestElement = divElements[j];
      }
      divElements[j].style.backgroundColor = defaulColor;
    }

    await swap(divElements[i], smallestElement);
    divElements[i].style.backgroundColor = sortedColor;
  }

  divElements[divElements.length - 1].style.backgroundColor = sortedColor;
}

// function onStartClick() {
//   console.log("start clicked");
//   var arrayLength = arrayElements.length;
//   console.log(arrayLength);
//   let k = 0;
//   for (let i = 0; i < arrayLength; i++) {
//     for (let j = 0; j < arrayLength - i - 1; j++) {
//       setTimeout(() => {
//         var heightj = parseInt(arrayElements[j].style.height, 10);
//         var heightjplus1 = parseInt(arrayElements[j + 1].style.height, 10);
//         if (heightj > heightjplus1) {
//           swap(arrayElements, j, j + 1);
//           document.getElementById(
//             arrayElements[j + 1].id
//           ).style.backgroundColor = `${sorted}`;
//         } else {
//           document.getElementById(
//             arrayElements[j].id
//           ).style.backgroundColor = `${sorted}`;
//         }
//       }, 1000 * k++);
//     }
//   }
// }

// function changeHeight() {
//   var elea = document.getElementById("id0");
//   var eleb = document.getElementById("id1");
//   console.log(
//     "before : " +
//       document.getElementById("id0").style.height +
//       " , " +
//       document.getElementById("id1").style.height
//   );
//   var heighta = elea.style.height;
//   var heightb = eleb.style.height;
//   console.log("before : " + heighta + " , " + heightb);
//   elea.style.height = heightb;
//   eleb.style.height = heighta;
// }
// function swap(arrayElements, a, b) {
//   var ida = arrayElements[a].id;
//   var idb = arrayElements[b].id;
//   var elea = document.getElementById(ida);
//   var eleb = document.getElementById(idb);
//   var heighta = elea.style.height;
//   var heightb = eleb.style.height;
//   elea.style.height = heightb;
//   eleb.style.height = heighta;
// }

// function changeColor(ele, color) {
//   ele.style.color = `${color}`;
// }
