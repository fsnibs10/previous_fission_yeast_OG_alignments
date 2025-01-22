/*------------Script commands------------*/
/**************************************************************************************************************************/
// let JSAV_JQuery_CSS = document.createElement("link");
// JSAV_JQuery_CSS.setAttribute("rel","stylesheet");
// JSAV_JQuery_CSS.setAttribute("href","scripts/jquery.css");
// document.getElementById("alignmentDiv").appendChild(JSAV_JQuery_CSS);

// let JSAV_JQuery_Script = document.createElement("script");
// JSAV_JQuery_Script.setAttribute("src","scripts/jquery-1.10.2.min.js");
// document.getElementById("alignmentDiv").appendChild(JSAV_JQuery_Script);

// let JSAV_JQuery_Script_Min = document.createElement("script");
// JSAV_JQuery_Script_Min.setAttribute("src","scripts/jquery-ui-1.10.4.custom.min.js");
// document.getElementById("alignmentDiv").appendChild(JSAV_JQuery_Script_Min);

// let JSAV_CSS = document.createElement("link");
// JSAV_CSS.setAttribute("rel","stylesheet");
// JSAV_CSS.setAttribute("href","scripts/JSAV.css");
// document.head.appendChild(JSAV_CSS);

// let JSAV_Script = document.createElement("script");
// JSAV_Script.setAttribute("src","scripts/JSAV.js");
// document.head.appendChild(JSAV_Script);

// let tooltipster = document.createElement("link");
// tooltipster.setAttribute("rel","stylesheet");
// tooltipster.setAttribute("href","scripts/tooltipster-master/css/tooltipster.css");
// document.getElementById("alignmentDiv").appendChild(tooltipster);

// let tooltipster_Script = document.createElement("script");
// tooltipster_Script.setAttribute("src","scripts/tooltipster-master/js/jquery.tooltipster.min.js");
// document.getElementById("alignmentDiv").appendChild(tooltipster_Script);

/*------------functions------------*/
/**************************************************************************************************************************/
function showAlign(obj,order){

    let alignmentTxtFileAddress = "/files/MFA/"+obj[order].GeneFamilyID+".txt";
    obj[order].alignmentObjectArray = alignmentTxtFileToObjectArray(alignmentTxtFileAddress);
    document.getElementById("geneTable").removeChild(document.getElementById("geneFamiliesTable"));
    window.scroll(0,0);
    JSAV_Display_Tool(obj[order].alignmentObjectArray);
}
function alignmentTxtFileToObjectArray(fileAddress){
    let txtObj = $.ajax({url:fileAddress, async: false});
    let txtObjArray = txtObj.responseText.split(/>/);
    let ObjArray = [];
    for ( let i=1; i < txtObjArray.length; i++ ){
        let temp = txtObjArray[i].split(/\r?\n/);
        let id = temp[0];
        let sequence="";
        for (let j=1; j<temp.length; j++){
            sequence += temp[j];
        }
        ObjArray.push({id:id,sequence:sequence});
    }
    return ObjArray;
}
function JSAV_Display_Tool(MySeqs){
    function myAction(divId, sequences){
        var seqString = "";
        for(var i=0; i<sequences.length; i++){
            seqString += ">" + sequences[i].id + "\n";
            seqString += sequences[i].sequence + "\n";
        }
        alert(seqString);
    }
    var MyOptions = Array();
    MyOptions.sortable = true;
    MyOptions.selectable = true;
    MyOptions.deletable = true;
    MyOptions.border = false;
    MyOptions.toggleDotify = true;
    MyOptions.toggleNocolour = true;
    MyOptions.fasta = true;
    MyOptions.consensus = true;
    MyOptions.colourScheme = "zappo";
    MyOptions.selectColour = true;
    MyOptions.callback = "enableTooltipster";

    printJSAV('sequenceDisplay', MySeqs, MyOptions);
}
function searchGene(gene,obj){
    let initialGene3 = gene[0]+gene[1]+gene[2];
    switch(initialGene3){
        case "SPO":
            for(let i = 0; i < obj.length; i++){
                for(let j = 0; j < obj[i].Schizosaccharomyces_cryophilus.length; j++){
                    if(gene == obj[i].Schizosaccharomyces_cryophilus[j]){
                        return i;
                    }
                }
            }
            break;
        case "SJA":
            for(let i = 0; i < obj.length; i++){
                for(let j = 0; j < obj[i].Schizosaccharomyces_japonicus.length; j++){
                    if(gene == obj[i].Schizosaccharomyces_japonicus[j]){
                        return i;
                    }
                }
            }
            break;
        case "SOC":
            for(let i = 0; i < obj.length; i++){
                for(let j = 0; j < obj[i].Schizosaccharomyces_octosporus.length; j++){
                    if(gene == obj[i].Schizosaccharomyces_octosporus[j]){
                        return i;
                    }
                }
            }
            break;
        case "SPA":
        case "SPB":
        case "SPC":
            for(let i = 0; i < obj.length; i++){
                for(let j = 0; j < obj[i].Schizosaccharomyces_pombe.length; j++){
                    if(gene == obj[i].Schizosaccharomyces_pombe[j]){
                        return i;
                    }
                }
            }
            break;
        default:
            alert("The gene you input is invalid.");
    }
}

/**************************************************************************************************************************/