import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private cdRef: ChangeDetectorRef) {}


  capchas: any[] = [
    {
      "imagem_path": "../assets/capts/226md.png",
      "resposta": "226md"
    },
    {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g"
    },
    {
      "imagem_path": "../assets/capts/2356g.png",
      "resposta": "2356g",
      "valor": 15.50
    },
    {
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

  isModalOpen = false;
  captchaCount = 0; // nova propriedade para contar o número de captchas processados


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.initProcess();
  }

  getRandomCapcha(availableCaptchas: any[]): any {
    const index = Math.floor(Math.random() * availableCaptchas.length);
    const selectedCaptcha = availableCaptchas[index];
    availableCaptchas.splice(index, 1);
    return selectedCaptcha;
  }

  initProcess() {
    if (this.captchaCount >= 2) {
        this.processQueue(); 
        return; 
    }

    let availableCaptchas = [...this.capchas];
    let captcha = this.getRandomCapcha(availableCaptchas);
    this.selectedCaptchas.push(captcha);
    this.insertQueue.push(captcha); 
    this.insertQueue.push({ texto: `Software: ${captcha.resposta}`, showLogo: false });

    if (captcha.valor) {
        this.insertQueue.push({ texto: `Parabéns! Seu saldo agora é R$${captcha.valor}`, showLogo: true });
    } else {
        this.insertQueue[this.insertQueue.length - 1].showLogo = true;
    }

    this.captchaCount++;

    setTimeout(() => {
        this.initProcess();
    }, 1000);
  }

  processQueue() {
    if (this.insertQueue.length > 0) {
      this.insertMessage.push(this.insertQueue.shift());
      setTimeout(() => {
        this.processQueue();
      }, 2000);
    }

    console.log(this.insertMessage);
    this.cdRef.detectChanges();
  }
}
