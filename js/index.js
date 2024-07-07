let $tableContainer = document.getElementById("tableContainer");
let rows = [];

const $propertiesWindow = document.getElementById("add-window");
$propertiesWindow.style.display = "none";
let propertiesOpen = false;

const $addTablePropertiesButton = document.getElementById("addTableButton");
$addTablePropertiesButton.addEventListener("click", propertiesWindow);
const $tableHeaderImg = document.getElementById("addTableHImg");

let dragSelection;

const $errorAdvice = document.getElementById("errorTable");
let errorFrameOpen = false;
$errorAdvice.style.display = "none";

let fatherTable;
let fatherTableItems;



function addTable(){
    let xVal = document.getElementById("xInput").value;
    let newName = document.getElementById("newName").value;
    let baseColor = document.getElementById("baseColor").value;
    let headerColor =document.getElementById("headerColor").value;
    let $newTable = document.createElement("div");
    

    //TABLE FATHER
    $newTable.classList = "table";
    $newTable.style.width = xVal+"px";
    $newTable.style.height = "auto"
    $newTable.style.backgroundColor = baseColor;
    

    //TABLE HEADER
    let $newTableHeader = document.createElement("div");
    $newTableHeader.classList = "table-header";
    $newTableHeader.style.backgroundColor = headerColor;

    let $newTableHeaderP = document.createElement("p");
    $newTableHeaderP.textContent = newName;
    $newTableHeaderP.style.paddingLeft="10px";


    let $newTableHeaderCrossButton = document.createElement("button");
    $newTableHeaderCrossButton.classList ="table-header-cross";




    let $newTableHeaderCrossImg = document.createElement("img");
    $newTableHeaderCrossImg.classList ="table-header-cross-image";
    $newTableHeaderCrossImg.setAttribute("src", "images/cross.png") 
    $newTableHeaderCrossImg.addEventListener("click", CrossHeader);


    $newTableHeaderCrossButton.appendChild($newTableHeaderCrossImg);

    $newTableHeader.appendChild($newTableHeaderP);
    $newTableHeader.appendChild($newTableHeaderCrossImg);

    //TABLE TASK SECTION
    let $tableTaskSection = document.createElement("div");
    $tableTaskSection.classList = "table-task-section";

    //TABLE TASK SECTION ----ROW----
    let $tableTaskSectionRow = document.createElement("div");
    $tableTaskSectionRow.classList = "row-table";
    $tableTaskSectionRow.draggable = true;
    let $tableRowDiv = document.createElement("div");
    $tableRowDiv.classList ="row-table-div";


    let $tableRowDivInput = document.createElement("input");
    $tableRowDivInput.type = "text";
    $tableRowDivInput.classList ="row-table-input";


    $tableRowDiv.appendChild($tableRowDivInput);

    let $tableTaskSectionHr = document.createElement("hr");
    $tableTaskSectionHr.style.margin="5px";
    $tableTaskSectionHr.style.padding="0px";

    $tableTaskSectionRow.appendChild($tableRowDiv);
    $tableTaskSectionRow.appendChild($tableTaskSectionHr);

    $tableTaskSection.appendChild($tableTaskSectionRow);

    //TABLE ADD ROW BUTTON
    let $tableAddRowButton = document.createElement("button");
    $tableAddRowButton.classList = "table-row-add-button";
    
    let $tableAddRowButtonImg = document.createElement("img");
    $tableAddRowButtonImg.setAttribute("src", "images/add.png") 
    $tableAddRowButtonImg.classList = "table-row-add-image";
    $tableAddRowButton.appendChild($tableAddRowButtonImg);

    //APPEND COMPONENTS TO FATHER
    $newTable.appendChild($newTableHeader);
    $newTable.appendChild($tableTaskSection);
    $newTable.appendChild($tableAddRowButton);
    $tableContainer.appendChild($newTable);

    //INSERT TABLE TO BACKEND
    tableList.push($newTable);


    //GENERATE IDS 
    $newTable.id = tableList.length;
    $tableAddRowButton.id = $newTable.id;
    $tableTaskSection.id = "table-id-" + $newTable.id ;
    $tableTaskSectionRow.id = "table-row-id-" + 0 ;
    

    //ADD EVENT BUTTON
    //$tableTaskSection --------- PADRE
    //$tableTaskSectionRow ------ HIJO
    $tableAddRowButton.addEventListener("click", function addRow(tablerowid){

    
        tablerowid = $tableTaskSection.id;

        //OBTAIN ROW PARENT
        let $parentRow = document.getElementById(tablerowid);

        if($parentRow.firstChild==null){
            

        




        }else{
        //CLONE CHILD
        let $childRow = $parentRow.firstChild.cloneNode(true);

        $childRow.firstChild.firstChild.value = "";


        rows.push($childRow);

        for(let i=0; i<rows.length; i++){
            $childRow.id =  "table-row-id-" + (i+1) ;
        }

        $parentRow.appendChild($childRow);
        }








        addOnclick();
        dragAndDrop();


    });


    // DELETE EVENT BUTTON

    let $tableRowCrossContainer = document.createElement("div");

    let $tableRowCrossButton = document.createElement("button");
    $tableRowCrossButton.classList = "table-row-cross";


    let $tableImgCrossButton = document.createElement("img");
    $tableImgCrossButton.classList ="table-row-cross-image";
    $tableImgCrossButton.setAttribute("src", "images/delete.png") 


    $tableRowCrossButton.appendChild($tableImgCrossButton);
    $tableRowCrossContainer.appendChild($tableRowCrossButton);

    $tableRowDiv.appendChild($tableRowCrossContainer);

    if(propertiesOpen==false){
        $propertiesWindow.style.display = "flex";
        propertiesOpen=true;
    }else{
        $propertiesWindow.style.display = "none";
        propertiesOpen=false;
    }
    dragAndDrop();


}


function addOnclick(){
    let deleteButtonsArray = document.getElementsByClassName("table-row-cross");
    for(let i=0; i<deleteButtonsArray.length; i++){
        deleteButtonsArray[i].addEventListener("click", function deleteRow(element){
            element = this;
            //element.parentNode.remove();
            let rowsDad = element.parentNode.parentNode.parentNode.parentNode;

            try {
                if(rowsDad.childElementCount>1){
                    element.parentNode.parentNode.parentNode.remove();

                }
            } catch (error) {
                console.log("Fila eliminada!");
            }

           
            
    
        });
     
    }
}

function CrossHeader(){

    this.parentNode.parentNode.remove();

}

function propertiesWindow(e){
    if( e.target == $addTablePropertiesButton|| e.target==$tableHeaderImg){

        if(propertiesOpen==false){
            $propertiesWindow.style.display = "flex";
            propertiesOpen=true;
        }else{
            $propertiesWindow.style.display = "none";
            propertiesOpen=false;
        }

    }else{

    }


    

}

function dragAndDrop(){

    //OBTAIN TABLES
    let TableList = document.getElementsByClassName("table-task-section");
    //OBTAIN ROWS
    let RowsList = document.getElementsByClassName("row-table");



    
    for (let i = 0; i < RowsList.length; i++) {
        RowsList[i].addEventListener("dragstart", function(e){
            dragSelection = e.target;
            fatherTable = e.target.parentNode;

            setTimeout(() => dragSelection.classList.add("dragging"), 0);

            fatherTable.addEventListener("dragover", initSortableList);
;

        });
        
    }

    for(let i=0; i<TableList.length; i++){
        TableList[i].addEventListener("dragover", function(e){
            e.preventDefault();
        
        });
        TableList[i].addEventListener("dragend", function(e){
            dragSelection.classList.remove("dragging");

        
        });
        TableList[i].addEventListener("drop", function(ev){


           //console.log(ev.target.closest(".table"));
           //console.log(fatherTable.parentNode);

           if(fatherTable.parentNode == ev.target.closest(".table")){
            //fatherTable -- Tabla actual de hijos 
            //fatherTableItems = fatherTable.children;



           }else{
            if(dragSelection.parentNode.childElementCount==1){

                if(errorFrameOpen==false){
                    $errorAdvice.style.display="flex";
                    errorFrameOpen=true;
    
                    setTimeout(() => {
 

                    $errorAdvice.style.display="none";
                    errorFrameOpen=false;
                    
                    }, 2000);
                }

            
            }else{
                this.appendChild(dragSelection);


                   
                 //console.log(ev.target.closest(".table"));

                    //ALT SHIF ARROW DOWN
            
            }
           }





        
        });
        
    }
    const initSortableList = (e) => {
        const draggingItem = fatherTable.querySelector(".dragging");
        const siblings = [...fatherTable.querySelectorAll(".row-table:not(.dragging)")];
        let nextSibling = siblings.find(sibling =>{
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;

        });

        //console.log(nextSibling);
        fatherTable.insertBefore(draggingItem, nextSibling);


    }


    


}

function dragAndDropOrder(){

}

