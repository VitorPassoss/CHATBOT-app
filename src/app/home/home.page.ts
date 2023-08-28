import { Component, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  @ViewChild('content', { static: false }) content!: IonContent;

  constructor(private cdRef: ChangeDetectorRef) {}


  capchas: any[] = [
    {
      "imagem_path": "../assets/capts/226md.png",
      "resposta": "226md",
      "valor": 6.35
    },
    {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 8.20
    },
    {
      "imagem_path": "../assets/capts/2b827.png",
      "resposta": "2b827",
      "valor": 12.04
    },
    {
      "imagem_path": "../assets/capts/2cg58.png",
      "resposta": "2cg58",
      "valor": 4.50
    }, {
      "imagem_path": "../assets/capts/2cgyx.png",
      "resposta": "2cgyx",
      "valor": 9.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 12.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }, {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    }
  ];

  insertMessage: any[] = [];
  selectedCaptchas: any[] = [];
  insertQueue: any[] = [];
  typingAnimation = { isTyping: true , showLogo: true}; 
  amount:number = 0.00
  isModalOpen = false;
  captchaCount = 0; 
  firstMessageCount: number = 0;
  processedMessagesCount: number = 0;
  showCard: boolean = false;
  currentCaptchaIndex: number = 0; 
  processQuant:number = 0
  saque = false
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.insertMessage = []
    this.initProcess();
    this.insertMessage.push(this.typingAnimation);
    setTimeout(()=>{
      this.insertMessage.pop()
    }, 2000)

  }

  ngAfterViewInit() {
    this.scroll();
}

scroll() {
  this.content.scrollToBottom(300); // 300ms animation speed
}
  
getRandomCapcha(availableCaptchas: any[]): {captcha: any, index: number} {
  const index = Math.floor(Math.random() * availableCaptchas.length);
  const selectedCaptcha = availableCaptchas[index];
  availableCaptchas.splice(index, 1);
  return { captcha: selectedCaptcha, index: index };
}
initProcess() {
  if (this.captchaCount >= 4) {
    this.processQueue();
    return;
  }

  let availableCaptchas = [...this.capchas];
  let { captcha, index } = this.getRandomCapcha(availableCaptchas);  // Use a desestruturação para pegar o captcha e o índice
  this.currentCaptchaIndex = index;
  this.selectedCaptchas.push(captcha);

  this.insertQueue.push(this.typingAnimation);
  this.insertQueue.push({imagem_path:captcha.imagem_path, showLogo: true})
  this.insertQueue.push({ texto: `Software: ${captcha.resposta}`, showLogo: true });
  this.insertQueue.push({ texto: `Parabéns! Seu saldo agora é R$${captcha.valor}`, showLogo: true , valor:captcha.valor});
  this.captchaCount++;

  setTimeout(() => {
    this.initProcess();
  }, 500);
}

  processQueue() {
    this.processQuant++
    if (this.insertQueue.length > 0) {
        

        const nextMessage = this.insertQueue.shift();

        if (nextMessage.isTyping) {
            this.insertMessage.push(nextMessage);
            
            
            setTimeout(() => {
             
                this.processQueue();
            }, 2000);  
        } else {
            if (this.processedMessagesCount % 3 === 0) {
                this.insertMessage.pop();
            }
            
            this.insertMessage.push(nextMessage);
            
            if(nextMessage.valor){
                this.amount = this.amount + nextMessage.valor;
            }
            
            setTimeout(() => {
                let currentMsg = this.insertMessage[this.insertMessage.length - 1]
                if(currentMsg.valor){
                  currentMsg.showLogo = true
                }else{
                  currentMsg.showLogo = false
                }
                this.processQueue();
            }, 1500);
            
            this.processedMessagesCount++;
        }
    } else {
        this.showCard = true;
        this.processedMessagesCount = 0;
    }
}


continueProcess() {
    this.insertQueue = [];
    this.captchaCount = 0
    this.showCard = false
    this.initProcess();
}

saqueActive(){
  this.saque = true
}


  
}
