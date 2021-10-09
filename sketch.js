//aqui ele criar os nomes das formas que vc vai criar

var trex;
var trexCorrendo;
var solo;
var imagemSolo;
var soloInvisivel;
var nuvemImagem;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var pontos = 0;
var estado = 'inicio'
var grupodeobstaculos;
var grupodenuvens;
var trexFim;
var reinicia;
var gamerOver;
var reiniciaimagem;
var gamerOverimagem;
var checkPoint, morte, pulo;
var larguraTela = window.innerWidth;

function reset(){
  
pontos = 0;  
  
grupodeobstaculos.destroyEach();  

console.log("comecar o jogo");  
  
estado = 'jogar';  
  
reinicia.visible = false; 
 
gamerOver.visible = false; 
  
trex.changeAnimation("correndo", trexCorrendo); 
  
grupodenuvens.destroyEach();    
  
}

function obstaculos() {
  
  if (frameCount % 100 === 0) { 
    var obstaculo = createSprite(larguraTela, 165, 10, 40);  
    obstaculo.velocityX = -(4 + 3 * pontos /100);   

    numero = Math.round(random (1,6))   
    switch(numero) {  

      case 1: obstaculo.addImage(obstaculo1)
      break;

      case 2: obstaculo.addImage(obstaculo2)
      break;

      case 3: obstaculo.addImage(obstaculo3)
      break;

      case 4: obstaculo.addImage(obstaculo4)
      break;

      case 5: obstaculo.addImage(obstaculo5)
      break;

      case 6: obstaculo.addImage(obstaculo6)
      break;

      default: break 

    }

    obstaculo.lifetime = larguraTela;

    obstaculo.scale = 0.6
    grupodeobstaculos.add(obstaculo);
  
  }

}

function nuvens() { 
    
  //ele serve para criar as nuvens ex: ele criar as nuvens em tempo pausada mente.  
  if (frameCount % 60 === 0) {
    var nuvem = createSprite(larguraTela, 100, 40, 10);  

    nuvem.velocityX = -3; 

    //ele avisa para nuvem que tem que colocar a imagem  
    nuvem.addImage(nuvemImagem);

     //ele cria um numero aleatorio que faz a nuvem tar para cima ou para baixo                        aleotariamente    
    nuvem.y = Math.round(random(1, 100))

    nuvem.lifetime = larguraTela;
    grupodenuvens.add(nuvem) 

  } 
  
}

function preload() {
//aqui vc colocar para adicionar as imagens salvas  

  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagemSolo = loadAnimation("ground2.png","ground2.png");  

  nuvemImagem = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  trexFim = loadImage("trex_collided.png");
  reiniciaimagem = loadImage("restart.png")
  gamerOverimagem = loadImage("gameOver.png")

  checkPoint = loadSound("checkPoint.mp3");
  morte = loadSound("die.mp3");
  pulo= loadSound("jump.mp3");

}

function setup(){
  createCanvas(larguraTela,200);

  trex = createSprite(50, 155, 15, 40);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("morreu", trexFim);
  trex.scale = 0.7;
  trex.setCollider("circle", 0,0,40)

  solo = createSprite(300, 190, 600, 20);  
  solo.addAnimation("soloanimacao",imagemSolo); 

  soloInvisivel = createSprite(300, 202, 600, 20);
  soloInvisivel.visible = false;

  var aleatorio = Math.round(random(1, 100))
  //console.log("oi " + "andrei " + "boanoite" + 5)

  grupodeobstaculos = new Group();  
  grupodenuvens = new Group();  

  reinicia = createSprite(larguraTela/2, 140, 40, 40);
  reinicia.addImage(reiniciaimagem);  
  reinicia.visible = false;  

  gamerOver = createSprite(larguraTela/2, 100, 40, 40);
  gamerOver.addImage(gamerOverimagem);  
  gamerOver.visible = false;
  

  }

function draw() {
  background("white");

  text("pontuação: " + pontos, 250, 50)   

  trex.velocityY = trex.velocityY + 0.5;

  trex.collide(soloInvisivel); 

  if (estado === 'jogar') {

    if (pontos %100 === 0 ) {
      checkPoint.play();
    }

    pontos = pontos + Math.round(frameRate()/60)

    solo.velocityX = -(4 + 3 * pontos /100);   

    if (solo.x <larguraTela /2 ) {
      solo.x = solo.width /2;     
    }

    if (keyDown("space") && trex.y >120) { 
      trex.velocityY= -6;
      pulo.play();
    }

    nuvens()

    obstaculos()

    if (grupodeobstaculos.isTouching(trex)) {
      estado = 'perdeu'  
      morte.play(); 
    }  

  } else if (estado === 'perdeu') {
    solo.velocityX = 0; 

    trex.changeAnimation("morreu", trexFim);  
    grupodeobstaculos.setVelocityXEach(0);  
    grupodenuvens.setLifetimeEach(-1);   

    grupodenuvens.setVelocityXEach(0);
    grupodeobstaculos.setLifetimeEach(-1);   

    reinicia.visible = true;  
    gamerOver.visible = true;  

    if (mousePressedOver(reinicia)) {
      reset();
    } 

  } else if (estado === 'inicio') {
    if (keyDown("space")) { 
      estado = 'jogar';  
    }             
  }
  
  
  drawSprites();
}