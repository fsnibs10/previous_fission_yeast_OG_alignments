/*------------Script commands------------*/
/**************************************************************************************************************************/

const excelFileAddress = "/files/Excels/all_data.txt";
var obj = [];
obj = txtToObjectArray(excelFileAddress);


/*------------functions------------*/
/**************************************************************************************************************************/

function txtSplitByNewLine(fileAddress){
    let txtObj = $.ajax({url:fileAddress, async: false});
    let txtObjArray = txtObj.responseText.split(/\r?\n/);
    return(txtObjArray);
}
function stringSplitByTab(str){
    let strArrayWithQuotationMark =  str.split(/\t/);
    for(let i=0; i < strArrayWithQuotationMark.length; i++){
        if ( strArrayWithQuotationMark[i][0] == "\"" ){
            strArrayWithQuotationMark[i] = strArrayWithQuotationMark[i].split(/\"/)[1];
        }
    }
    let strArrayWithoutQuotationMark = strArrayWithQuotationMark;
    return strArrayWithoutQuotationMark;
}
function stringArrayToObject(strArray){
    let objc = new Object();
    objc.GeneFamilyID = strArray[0];
    objc.GeneFamilyDescription = strArray[1];
    objc.NumberOfFissionYeastSpeciesContainingTheGeneFamily = strArray[2];
    objc.NumberOfFissionYeastGenesInTheGeneFamily = strArray[3];
    objc.Schizosaccharomyces_cryophilus = strArray[4].split(/,/);
    objc.Schizosaccharomyces_japonicus = strArray[5].split(/,/);
    objc.Schizosaccharomyces_octosporus = strArray[6].split(/,/);
    objc.Schizosaccharomyces_pombe = strArray[7].split(/,/);
    return objc;
}
function txtToObjectArray(fileAddress){
    let temp = txtSplitByNewLine(fileAddress);
    let txtObjArray = [];
    for( let i = 0; i < temp.length; i++ ){
        txtObjArray[i] = stringArrayToObject(stringSplitByTab(temp[i]));
    }
    return txtObjArray;
}
function createHtmlTable(obj){
    let tr=[];
    let Align = [];
    let Tree = [];
    for(let i = 0;i < obj.length; i++){
        tr[i] = document.createElement("tr");
        let td = [];
        if(!i){
            for(let j = 0; j < 10; j++){
                td[j] = document.createElement("th");
                td[j].bgColor = "#815DA8";
                td[j].style.color = "#DADADA";
                td[j].align="left";
            }
            td[0].innerHTML = "Gene family ID";
            td[1].innerHTML = "Gene family description";
            td[2].innerHTML = "Number of fission yeast species containing the gene family";
            td[3].innerHTML = "Number of fission yeast genes in the gene family";
            td[4].innerHTML = "Align\nment";
            td[5].innerHTML = "Tree";
            td[6].innerHTML = "Schizosaccharomyces cryophilus";
            td[7].innerHTML = "Schizosaccharomyces japonicus";
            td[8].innerHTML = "Schizosaccharomyces octosporus";
            td[9].innerHTML = "Schizosaccharomyces pombe";
            for(let j = 0; j < 10; j++){
                tr[i].appendChild(td[j]);
            }
        }else{
            for(let j = 0; j < 10; j++){
                td[j] = document.createElement("td");
                td[j].style.wordBreak = "break-all";
                switch(j){
                    case 0:
                        td[j].innerHTML = obj[i].GeneFamilyID;break;
                    case 1:
                        td[j].innerHTML = obj[i].GeneFamilyDescription;break;
                    case 2:
                        td[j].innerHTML = obj[i].NumberOfFissionYeastSpeciesContainingTheGeneFamily;break;
                    case 3:
                        td[j].innerHTML = obj[i].NumberOfFissionYeastGenesInTheGeneFamily;break;
                    case 4:
                        Align[i] = document.createElement("button");
                        Align[i].innerHTML = "A";
                        Align[i].style.color = "#B8112F";
                        Align[i].style.fontSize = "25px";
                        Align[i].onclick = function(){showAlign(obj,i)};
                        td[j].appendChild(Align[i]);
                        break;
                    case 5:
                        Tree[i] = document.createElement("button");
                        Tree[i].href = "#";
                        Tree[i].innerHTML = "T";
                        Tree[i].style.fontSize = "25px";
                        Tree[i].onclick = function(){showTree(obj,i)};
                        td[j].appendChild(Tree[i]);
                        break;
                    case 6:
                        td[j].innerHTML = obj[i].Schizosaccharomyces_cryophilus;break;
                    case 7:
                        td[j].innerHTML = obj[i].Schizosaccharomyces_japonicus;break;
                    case 8:
                        td[j].innerHTML = obj[i].Schizosaccharomyces_octosporus;break;
                    case 9:
                        td[j].innerHTML = obj[i].Schizosaccharomyces_pombe;break;
                    default:
                        break;
                }
                tr[i].appendChild(td[j]);
            }
        }
        geneFamiliesTable.appendChild(tr[i]);
    }
}

/**************************************************************************************************************************/