
console.log("Rodando privacidadeemrisco04.js");

	// --Janelas----------------------------------------------
	var idBody, DivLogar, DivIntro, IdJanelaEmail, IdJanelaSocial, IdJanelaMensagem,IdJanelaImgEditor, IdJanelaQueroQuero, IdJanelaNote;
	// --Narração----------------------------------------------
	var idTextoNote, spanNoteLink1,	spanNoteLink2, spanNoteLink3
	var linkNote1, linkNote2, linkNote3
	// --Mensagem----------------------------------------------
	var idPersonaMensagem, idTextoMensagem, spanMensagemLink1,	spanMensagemLink1, spanMensagemLink1
	var linkMensagem1, linkMensagem2, linkMensagem3
	// --Email-------------------------------------------------
	var idPersonaEmail, idTextoEmail, spanEmailLink1, spanEmailLink2, spanEmailLink3
	var linkEmail1, linkEmail2, linkEmail3
	// --Social-------------------------------------------------
	var idPersonaSocial, idTextoSocial, spanSocialLink1, spanSocialLink2, spanSocialLink3
	var linkSocial1, linkSocial2, linkSocial3
	// --QueroQuero-------------------------------------------------
	var idTextoInputQueroQuero, idPersonaQueroQuero, idTextoQueroQuero, spanQueroQueroLink1, spanQueroQueroLink2, spanQueroQueroLink3
	var linkQueroQuero1, linkQueroQuero2, linkQueroQuero3

    var senhaacesso
	var AppAtual = ""

	//app = "note", "chat", "email", "social", "queroquero"
	//persona= "Narrador", "GrupoFamilia", "Michelle CEO do balacobaco", "Zezinho", "JAMV",

	var layout = {
		casa : {
			cor1:"",
			fundotela:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHwwrT1xaZEzfFkfl0HfyRBXK-g3c3ZBHP8N-OauhtAZOQ1z837yERo7WNA_pFRgh3rIQ&usqp=CAU"
		},
		trabalho : {
			cor1:"",
			fundotela:"https://thumbs.dreamstime.com/b/green-abstract-background-9790389.jpg"
		}
	}

	var possibleActions = {
		note:["","",""],
		chat:["","",""],
		email:["","",""],
		social:["","",""],
		queroquero:["","",""]
	}

    /*
    function convetStrJSON(){
        var testejson = '{"nome":"vinicius" , "Profissao":"programador" , "idade":44}'; // JSON para teste
        const datateste = JSON.parse(testejson); // Converter string em JSON.
        console.log(datateste.nome);
        console.log(datateste.Profissao);
        console.log(datateste.idade);
    }
    */

    var DataStory 

    async function carregarJSON() {
        //=Dados=do=Roteiro=
        const res = await fetch("/static/sistemaoperacional/dadosprivacidadeemrisco.json");
        const data = await res.json();
        //console.log(data);
        DataStory =  data.dados;
        console.log("Carregou JSON")
    }

	function atualizabutton(varIdlink, varNumStory, varNumLink, varSpan, varJanela){
			//alert("atualizabutton("+varNumStory+","+varNumLink+");")
			possibleActions[varJanela][varNumLink]=DataStory[varNumStory].link[varNumLink].id;
			varSpan.innerText = DataStory[varNumStory].link[varNumLink].label;

			if(DataStory[varNumStory].link[varNumLink].label!==""){	
				abrirJanela(varIdlink);
			}else {
				fecharJanela(varIdlink);
			}

			//possibleActions["note"][varNumLink]=DataStory[varNumStory].link[varNumLink].label;
			//possibleActions["chat"][varNumLink]=DataStory[varNumStory].link[varNumLink].label;
			//possibleActions["email"][varNumLink]=DataStory[varNumStory].link[varNumLink].label;
			//possibleActions["social"][varNumLink]=DataStory[varNumStory].link[varNumLink].label;
			//possibleActions["queroquero"][varNumLink]=DataStory[varNumStory].link[varNumLink].label;
	}
	
	
	
	function nextPont(btClicado, atualJanela){
		console.log("nextPont("+btClicado+","+atualJanela+"); -> "+possibleActions[atualJanela][btClicado])

		if(AppAtual==atualJanela){
			console.log("Fluxo principal! APP="+AppAtual)
			for (let i = 0; i < DataStory.length; i++) {
    		    if(DataStory[i].pid==possibleActions[atualJanela][btClicado]){
					console.log("ACHOU!!! i="+i)
					updatePoint(i);
					break;
				}
      		}
		}else{
			console.log("Fluxo paralelo. Ignorar APP="+AppAtual)
			if(atualJanela=="note"){
				fecharJanela(IdJanelaNote);
		
			}else if(atualJanela=="chat"){
				fecharJanela(IdJanelaMensagem);
		
			}else if(atualJanela=="email"){
				fecharJanela(IdJanelaEmail);
		
			}else if(atualJanela=="social"){
				fecharJanela(IdJanelaSocial);
				
			}else if(atualJanela=="queroquero"){
				fecharJanela(IdJanelaQueroQuero);
			}
		}
	}

	function updatePoint(numTemp){

		//app = "note", "chat", "email", "social", "queroquero"
		//persona: "Narrador", "GrupoFamilia", "Michelle CEO do balacobaco", "Zezinho", "JAMV",
		console.log("updatePoint("+numTemp+") : Abrindo o APP "+DataStory[numTemp].app+".");

		let indexStory=numTemp;
		AppAtual=DataStory[numTemp].app;

		//layout.casa.fundotela
		//
		//divBody.style.display = layout.trabalho.fundotela;
		if(numTemp<2){
			idBody.style.backgroundImage = 'url("'+layout.casa.fundotela+'")';
		}else if(DataStory[numTemp].name=="Primeiro dia de trabalho"){
			//abrirJanela(DivLogar);
			DivLogar.style.display = "flex"; //Esconder Janela de login do trabalho.
			idBody.style.backgroundImage = 'url("'+layout.trabalho.fundotela+'")';
		}

		if(DataStory[numTemp].app!=="note"){
			//fecharJanela(IdJanelaNote); //esconder janela do narrador.		
			idTextoNote.innerText = DataStory[indexStory].name;
			fecharJanela(linkNote1);
			fecharJanela(linkNote2);
			fecharJanela(linkNote3);
		}

		fecharTodasJanela();

		if(DataStory[numTemp].app=="note"){
			abrirJanela(IdJanelaNote);
			idTextoNote.innerText = DataStory[indexStory].output;	
			atualizabutton(linkNote1,indexStory,0,spanNoteLink1,"note");
			atualizabutton(linkNote2,indexStory,1,spanNoteLink2,"note");
			atualizabutton(linkNote3,indexStory,2,spanNoteLink3,"note");

		}else if(DataStory[numTemp].app=="chat"){
			abrirJanela(IdJanelaMensagem);
			idPersonaMensagem.innerText = DataStory[numTemp].persona
			idTextoMensagem.innerText = DataStory[numTemp].output
			atualizabutton(linkMensagem1,indexStory,0,spanMensagemLink1,"chat");
			atualizabutton(linkMensagem2,indexStory,1,spanMensagemLink2,"chat");
			atualizabutton(linkMensagem3,indexStory,2,spanMensagemLink3,"chat");

		}else if(DataStory[numTemp].app=="email"){
			abrirJanela(IdJanelaEmail);
			idPersonaEmail.innerText = DataStory[numTemp].persona
			idTextoEmail.innerText = DataStory[numTemp].output
			atualizabutton(linkEmail1,indexStory,0,spanEmailLink1,"email");
			atualizabutton(linkEmail2,indexStory,1,spanEmailLink2,"email");
			atualizabutton(linkEmail3,indexStory,2,spanEmailLink3,"email");

		}else if(DataStory[numTemp].app=="social"){
			abrirJanela(IdJanelaSocial);
			idPersonaSocial.innerText = DataStory[numTemp].persona
			idTextoSocial.innerText = DataStory[numTemp].output
			atualizabutton(linkSocial1,indexStory,0,spanSocialLink1,"social");
			atualizabutton(linkSocial2,indexStory,1,spanSocialLink2,"social");
			atualizabutton(linkSocial3,indexStory,2,spanSocialLink3,"social");

		}else if(DataStory[numTemp].app=="queroquero"){
			abrirJanela(IdJanelaQueroQuero);
			idPersonaQueroQuero.innerText = DataStory[numTemp].persona
			idTextoInputQueroQuero.innerText = DataStory[numTemp].input
			idTextoQueroQuero.innerText = DataStory[numTemp].output
			atualizabutton(linkQueroQuero1,indexStory,0,spanQueroQueroLink1,"queroquero");
			atualizabutton(linkQueroQuero2,indexStory,1,spanQueroQueroLink2,"queroquero");
			atualizabutton(linkQueroQuero3,indexStory,2,spanQueroQueroLink3,"queroquero");

		}
	}



	function initObjHtml(){
        
		// --Narração----------------------------------------------
		idTextoNote = document.getElementById("idTextoNote");
		spanNoteLink1 = document.getElementById("spanNoteLink1");
		spanNoteLink2 = document.getElementById("spanNoteLink2");
		spanNoteLink3 = document.getElementById("spanNoteLink3");
		linkNote1 = document.getElementById("linkNote1");
		linkNote2 = document.getElementById("linkNote2");
		linkNote3 = document.getElementById("linkNote3");

		// --Mensagem----------------------------------------------
		idPersonaMensagem  = document.getElementById("idPersonaMensagem");
		idTextoMensagem  = document.getElementById("idTextoMensagem");
		spanMensagemLink1 = document.getElementById("spanMensagemLink1");
		spanMensagemLink2 = document.getElementById("spanMensagemLink2");
		spanMensagemLink3 = document.getElementById("spanMensagemLink3");	
		linkMensagem1 = document.getElementById("linkMensagem1");
		linkMensagem2 = document.getElementById("linkMensagem2");
		linkMensagem3 = document.getElementById("linkMensagem3");

		// --Email-------------------------------------------------
		idPersonaEmail = document.getElementById("idPersonaEmail");
		idTextoEmail = document.getElementById("idTextoEmail");
		spanEmailLink1 = document.getElementById("spanEmailLink1");
		spanEmailLink2 = document.getElementById("spanEmailLink2");
		spanEmailLink3 = document.getElementById("spanEmailLink3");
		linkEmail1 = document.getElementById("linkEmail1");
		linkEmail2 = document.getElementById("linkEmail2");
		linkEmail3 = document.getElementById("linkEmail3");

		// --Social-------------------------------------------------
		idPersonaSocial= document.getElementById("idPersonaSocial");
		idTextoSocial= document.getElementById("idTextoSocial");
		spanSocialLink1= document.getElementById("spanSocialLink1");
		spanSocialLink2= document.getElementById("spanSocialLink2");
		spanSocialLink3= document.getElementById("spanSocialLink3");
		linkSocial1 = document.getElementById("linkSocial1");
		linkSocial2 = document.getElementById("linkSocial2");
		linkSocial3 = document.getElementById("linkSocial3");

		// --QueroQuero-------------------------------------------------
		idPersonaQueroQuero= document.getElementById("idPersonaQueroQuero");
		idTextoInputQueroQuero= document.getElementById("idTextoInputQueroQuero");
		idTextoQueroQuero= document.getElementById("idTextoQueroQuero");
		spanQueroQueroLink1= document.getElementById("spanQueroQueroLink1");
		spanQueroQueroLink2= document.getElementById("spanQueroQueroLink2");
		spanQueroQueroLink3= document.getElementById("spanQueroQueroLink3");
		linkQueroQuero1 = document.getElementById("linkQueroQuero1");
		linkQueroQuero2 = document.getElementById("linkQueroQuero2");
		linkQueroQuero3 = document.getElementById("linkQueroQuero3");

		// --Tela-Inicial-------------------------------------------------
		DivIntro = document.getElementById("DivIntro"); // Esconder tela inicial.
		
		// Janelas
		IdJanelaImgEditor = document.getElementById("IdJanelaImgEditor");
		IdJanelaEmail = document.getElementById("IdJanelaEmail");
		IdJanelaSocial = document.getElementById("IdJanelaSocial");
		IdJanelaQueroQuero = document.getElementById("IdJanelaQueroQuero");
		IdJanelaMensagem = document.getElementById("IdJanelaMensagem");
		IdJanelaNote= document.getElementById("IdJanelaNote");

		idBody = document.getElementById("idBody"); // Fundo de tela.
		DivLogar = document.getElementById("DivLogar"); // Tela login .
	}


	function fecharTodasJanela(){
		fecharJanela(IdJanelaImgEditor);
		fecharJanela(IdJanelaEmail);
		fecharJanela(IdJanelaSocial);
		fecharJanela(IdJanelaQueroQuero);
		fecharJanela(IdJanelaMensagem);
	}


    function validasenha(){
        let senhaacesso = document.getElementById("senhaacesso");
        if(senhaacesso.value == "4321"){
            init();
        }
    }

	function init(){
		console.log("iniciou o Game.");
		initObjHtml();
        
		DivIntro.style.display = "none"; //Esconder Janela de Informações.
		DivLogar.style.display = "none"; //Esconder Janela de login do trabalho.

		fecharTodasJanela();
		//fecharJanela(IdJanelaImgEditor);
		//fecharJanela(IdJanelaEmail);
		//fecharJanela(IdJanelaSocial);
		//fecharJanela(IdJanelaQueroQuero);
		//fecharJanela(IdJanelaMensagem);

		Dragable(IdJanelaImgEditor); //Mover janela.
		Dragable(IdJanelaEmail); //Mover janela.
		Dragable(IdJanelaSocial); //Mover janela.
		Dragable(IdJanelaQueroQuero); //Mover janela.
		Dragable(IdJanelaMensagem); //Mover janela.
		
		//animate();
		
		updatePoint(1)
	};

	function abrirJanela(el){
		el.style.display = "block"; //Mostrar janela de Edição de materiais.
	}
	
	
	function fecharJanela(el){
		el.style.display = "none"; //Esconder Janela de Editor de materiais.
	}
	
	function MaxJanela(el){
		if(el.style.width == "98%"){
			el.style.width = "50%";
		}else{
			el.style.width = "98%";
			el.style.top = "0";
			el.style.left = "0";
		}
	}

	function moveJanelaTop(el){
		el.style.top = "0";
		el.style.left = "0";
	}
	
	
	function animate(){
		console.log("animate()");
	};

	function clkIcon(){
		console.log("clkIcon()");
	};

	//init()
	//Adiciona eventos pra navegadores modernos e antigos
	function addEvent(el, type, callback) {
		if (el.addEventListener) {
			el.addEventListener(type, callback);
		} else if (el.attachEvent) {
			el.attachEvent("on" + type, callback);
		}
	}

	//Mover janela.
	function Dragable(el)	{
			var isMove = false, // Verifica se esta se movendo.
				x = 0, y = 0, // Pega as coordenadas do mouse.
				xel = 0, yel = 0; // Ultima posição do elemento.

			addEvent(el, "mousedown", function (e) {
				isMove = true;
				el.className += " isMovinDivMenuOSg";
				x = window.event ? window.event.clientX : e.pageX;
				y = window.event ? window.event.clientY : e.pageY;
				xel = x - el.offsetLeft;
				yel = y - el.offsetTop;
			});

			addEvent(document, "mousemove", function (e) {
				if(el.style.width!="98%"){	
					if (isMove) {
						e.preventDefault();
						x = window.event ? window.event.clientX : e.pageX;
						y = window.event ? window.event.clientY : e.pageY;
						el.style.left = (x - xel) + 'px';
						el.style.top  = (y - yel) + 'px';
					}
				}
			});

			addEvent(document, "mouseup", function () {
				el.className = String(el.className).replace(/(^|\s)isMoving(\s|$)/g, " ");
				isMove = false;
			});
		};

        carregarJSON()

