
//1. get btn and add event lictener click
//2. func getvalue = get value and set local storage main
//3. show function banana hai jo ki call hoga sbse phele or hr jgha jha nhi koi action hoga
//4. hme hr jagha hme local storage ko set krna hoga
//5. local storage mein hm textContent ke naam se key bnake store krenge
//6. task ko show krna hai
//7. show text wala fun 2 bar call hoga ek bar jb value push krenge or
// ek bar sbse upr taki page reload hone sbse phele vo item parse hoke textObj
// mein aajye or show jaye
//8. do same thing without using forEach loop by using map method.
//9. make a delete fun to delete a specific task, it will take a index that was passed in map method
//10. make a fucntion that delete all the task at one time
//11. edittask funtion that edit the task
//12. on click of edit btn it should be changed into save task btn
//13. make a fun that run on click on save task btn and add the task
//14. get the hiden input filed that
//15. adding search filter
//16. get the search input by id
let addbtn = document.getElementById("adbtn");
addbtn.addEventListener("click", getvalue);
let taskContainer = document.getElementById("taskContainer");
let deletebtn = document.getElementById("deletebtn");
deletebtn.addEventListener("click", deleteAllTask);
let savebtn = document.getElementById("savebtn");
savebtn.addEventListener("click", saveTask);
let saveindex = document.getElementById("saveindex");
let searchInput = document.getElementById("searchInput")
let searchbtn = document.getElementById("searchbtn");


showText();

function getvalue() {
    let textValue = document.querySelector(".text").value;
    // console.log(`this is text value`, textValue)
    // phele check krenge ki kya "textContent" key mein koi value hai
    let textContent = localStorage.getItem("textContent");
    // console.log(textContent);
    if (textValue != '') {
        if (textContent == null) {
            // create a arry name of textObj;
            textObj = [];
            // console.log(textObj);
        } else {
            // agr textContent ke andr koi value hai to use parse kr do textObj main
            textObj = JSON.parse(textContent);
            // console.log(`jo value pass hue hi`, textObj);
        }
        // phir textarea ki jo bhi value hai usse push kr do textObj mein;
        // console.log(`jo value push hue h`, textValue);
        textObj.push(textValue);

        // jaise hi value textObj mein pass ho textarea = '' ho jaye
        document.querySelector(".text").value = ''
        // console.log(`value push hone ke baad ka array`, textObj);
        // end main jo value text obj mein hai use set kr do localstorage main
        localStorage.setItem("textContent", JSON.stringify(textObj));
        showText()
    }
}

// show text function

function showText() {
    // we need textvalue
    let textValue = document.querySelector(".text").value;
    let textContent = localStorage.getItem("textContent");
    // also we need textObj so that we can run map method
    textObj = JSON.parse(textContent);
    // console.log(textObj)
    // if textobj null nhi h to hi run hoga map method
    if (textObj != null) {
        let html = textObj.map((item, index) => {
            return `
             <div class="card">
                     <div class="card-body me-2">
                         <h5 class="card-title">Task${index + 1}</h5>
                            <p>${item}</p>
                         <button class="btn btn-danger my-2" onclick = "deleteTask(${index})">Delete Task</button>
                         <button class="btn btn-success my-2" onclick = "editTask(${index})">edit</button>
                     </div>
             </div>`

        })
        // so that we cannot see the weired , in page
        html = html.join("");
        taskContainer.innerHTML = html;
    }
}


// delete one task function

function deleteTask(index) {
    // copy krna padega taki hm yha pr textObj arr ko get kr ske
    let textContent = localStorage.getItem("textContent");
    // console.log(textContent);
    textObj = JSON.parse(textContent);
    console.log(textObj);
    // we will splice the textObj from index to lenght 1
    textObj.splice(index, 1);
    // and set local storage after delete the index so that it can be 
    // deleted from local storage
    // and call the function show text again
    localStorage.setItem("textContent", JSON.stringify(textObj));
    showText();
}

// deleteAllTask function

function deleteAllTask() {
    // first of all we have to get all the value of local storage
    let textContent = localStorage.getItem("textContent");
    // second we have to pass all the value in textObj array
    textObj = JSON.parse(textContent);
    // after this we can clear all the local storage
    localStorage.clear();
    // console.log(textObj)
    // after clear storage we can do hmtl blank
    let html = '';
    // so we need to make taskcontainer html blank
    taskContainer.innerHTML = html;
}

// edit task function

function editTask(index) {
    document.querySelector(".text").value = textObj[index];
    // input hidden jo h uske value index ke equal kr dete hai
    saveindex = index;
    savebtn.style.display = "inline";
    addbtn.style.display = "none";
}

// write functon that save edit task

function saveTask() {
    textObj[saveindex] = document.querySelector(".text").value;
    localStorage.setItem("textContent", JSON.stringify(textObj));
    document.querySelector(".text").value = '';
    showText();
}

// filter function

// firstly w'll listen for input
searchInput.addEventListener("input",()=>{
    // get the value of input
    let searchvalue = searchInput.value
    // console.log(searchvalue);
// get all the card that containes task instead of using queryselector
// we will use getElementByTagsName becoz we need live collection
// that is html collection so that we can add any operation
    // let card = document.getElementsByTagName("card");
    let card = document.getElementsByClassName("card")
    // console.log(card)
    // we w'll use Array.from so that we can use it as an array
    // to get the paragraph text
    // now every card will pass as elem and w'll get p tag
    Array.from(card).forEach((elem,index) =>{
        // kyuki ye phele bar chlne pr jo elem hai uska html collection
        // 0 zero de rha hai isliye first index skip krenge
        if(index>0){
        console.log(index)
        let cardtxt = elem.getElementsByTagName("p")[0].innerText;
        // console.log(cardtxt)
        if(cardtxt.includes(searchvalue)){
            elem.style.display = "block"
        }else{
            elem.style.display = "none"
        }
        }
    })



})
