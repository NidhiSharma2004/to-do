
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


const addbtn = document.getElementById("adbtn");
addbtn.addEventListener("click",getvalue);
let taskContainer = document.getElementById("taskContainer");
showText()

function getvalue(){
    const textValue = document.querySelector(".text").value;
    console.log(`this is text value`,textValue)
    // phele check krenge ki kya "textContent" key mein koi value hai
    let textContent = localStorage.getItem("textContent"); 
    console.log(textContent);
    if(textContent==null){
        // create a arry name of textObj;
        textObj=[];
        console.log(textObj);
    }else{
        // agr textContent ke andr koi value hai to use parse kr do textObj main
        textObj = JSON.parse(textContent);
        console.log(`jo value pass hue hi`,textObj);
    }
    // phir textarea ki jo bhi value hai usse push kr do textObj mein;
    console.log(`jo value push hue h`,textValue);
    textObj.push(textValue);
    console.log(`value push hone ke baad ka array`,textObj);
    // end main jo value text obj mein hai use set kr do localstorage main
    localStorage.setItem("textContent",JSON.stringify(textObj));
    showText()

}

// show text function
function showText(){
    // page reload hone p ye sb invisible na ho isliye
    // hme inhe ya bhi get krna hoga
    const textValue = document.querySelector(".text").value;
    let textContent = localStorage.getItem("textContent"); 
    console.log(textContent);
    if(textContent==null){
        textObj=[];
        console.log(textObj);
    }else{
        textObj = JSON.parse(textContent);
        console.log(`jo value pass hue hi`,textObj);
    }
    // create blank html jisme hm output ko store krenge
    let html = ''
    // ab kyuki hmne textObj mein sare value pass kr le h to hm
    // ispe forEach loop lga skte hain
    textObj.forEach((element,index) => {
        html+=`
        <div class="card mx-2" >
            <div class="card">
                <div class="card" style="width: 18rem;">
                    <div class="card-body me-2 ">
                        <h5 class="card-title">Task${index+1}</h5>
                        <div class="form-floating">
                            <textarea class="form-control" id="floatingTextarea" rows="30">${element}</textarea>
                        </div>
                        <button class="btn btn-primary my-2">Delete Task</button>
                    </div>
                </div>

            </div>
        </div>
        `
    });
    taskContainer.innerHTML = html
}
