var blocos = [];
var personagem = new Object();
var dimensaoCenarioX=500, dimensaoCenarioY=500, larguraBloco=100, alturaBloco=100;
var larguraTela=1400, alturaTela=750;
var xi, yi, xf, yf;
var texturaBloco;

function preload(){
	texturaBloco = loadImage('imagens/bloco1.jpg');
}

function criarPersonagem(){
	personagem.posicaoX = 300;
	personagem.posicaoY = 300;
	personagem.altura = 60;
	personagem.largura = 60;
	personagem.massa = 1;
	personagem.velocidadeX = 0;
	personagem.velocidadeY = 0;
	personagem.aceleracaoX = 0.4;
	personagem.aceleracaoY = 0;
	personagem.movimento = function(){
							if(keyIsDown(37))
								personagem.velocidadeX-= personagem.aceleracaoX;
								
							if(keyIsDown(39))
								personagem.velocidadeX+= personagem.aceleracaoX;
								
							if(!keyIsDown(37) && !keyIsDown(39))
								personagem.velocidadeX*= 0.9;
								
							if(keyIsDown(38))
								personagem.velocidadeY = -15;
							
							if(Math.abs(personagem.velocidadeX) > 7)
								personagem.velocidadeX = personagem.velocidadeX/Math.abs(personagem.velocidadeX)*5;
								
								
							personagem.posicaoX+= personagem.velocidadeX;
							personagem.posicaoY+= personagem.velocidadeY;
						}
}

function imprimirPersonagem(personagem){
	noStroke();
	fill(0, 100, 200);
	ellipse(personagem.posicaoX + larguraTela/2, personagem.posicaoY + alturaTela/2, personagem.largura - Math.abs(personagem.velocidadeY)/2, personagem.altura + Math.abs(personagem.velocidadeY));
}

function criarBlocos(){
	for(var i=0; i <= dimensaoCenarioX; i++){
		blocos[i] = [];
		for(var j=0; j <= dimensaoCenarioY; j++){
			blocos[i][j] = new Object();
			if(random(1,10) > 8){
				blocos[i][j].largura = larguraBloco;
				blocos[i][j].altura = alturaBloco; 
				blocos[i][j].textura = 'bloco';
				blocos[i][j].existe = 'sim'; 
			}
			else{
				blocos[i][j].largura = larguraBloco;
				blocos[i][j].altura = alturaBloco; 
				blocos[i][j].textura = 'bloco';
				blocos[i][j].existe = 'nao';
			}
		}
	}
}

function imprimirBlocos(){
	
	xi = int(personagem.posicaoX/larguraBloco) - int(larguraTela*0.8/larguraBloco);
	yi = int(personagem.posicaoY/alturaBloco) - int(alturaTela*0.8/alturaBloco);
	xf = int(personagem.posicaoX/larguraBloco) + int(larguraTela*0.8/larguraBloco);
	yf = int(personagem.posicaoY/alturaBloco) + int(alturaTela*0.8/alturaBloco);
	
	if(xi < 0 )
		xi = 0;
	if(xf >= dimensaoCenarioX)
		xf = dimensaoCenarioX-1;
	if(yi < 0 )
		yi = 0;
	if(yf >= dimensaoCenarioY)
		yf = dimensaoCenarioY-1;
	
	fill(255);
	for(var i=xi; i<xf; i++)
		for(var j=yi; j<yf; j++)
			if(blocos[i][j].existe == 'sim')
				image(texturaBloco, blocos[i][j].largura * i + larguraTela/2, blocos[i][j].altura * j + alturaTela/2, blocos[i][j].largura, blocos[i][j].altura);
}
	
function setup(){
	createCanvas(larguraTela, alturaTela);	
	criarBlocos();
	criarPersonagem();
}

function draw(){
	background(173,216,230);
	translate(-personagem.posicaoX, -personagem.posicaoY);
	imprimirBlocos();
	imprimirPersonagem(personagem);
	personagem.movimento();
	gravidade(1);
	colisao();
		
}
