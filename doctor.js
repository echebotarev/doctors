'use strict';
//
// Рендеринг div'а при наведении на врача
//
class Doctor {
    constructor(options) {
        this._elem = options.element;

        this._itemDoctors = this._elem.querySelectorAll('.item_doctor');
        for ( var i = 0; i  < this._itemDoctors.length; i++ ){
            this._itemDoctor = this._itemDoctors[i];

            this._itemDoctor.addEventListener('mouseleave', this._onMouseLeaveBlock.bind(this));
        }

        this._elem.addEventListener('mouseover', this._onMouseOverElement.bind(this));
    }

    _onMouseOverElement(e) {
        var target;

        target = e.target;

        if ( target.classList.contains('item_doctor') ) {
            this._renderBlock(target);
            this._showBlock(target);
        }

    }

    _onMouseLeaveBlock(e) {
        var target;

        target = e.target;

        this._hideBlock(target);
    }

    _renderBlock(target) {
        var imgDiv,
            name,
            data,
            block,
            description,
            a;

        imgDiv = target.querySelector('.item_doctor__img').cloneNode(true);
        name = target.querySelector('h2').cloneNode(true);
        data = imgDiv.querySelector('img').dataset.doctor;

        a = document.createElement('a');
        a.setAttribute('href', 'doc.html');
        a.appendChild(imgDiv);

        description = document.createElement('p');
        description.classList.add('doctor__overflow__p');
        description.innerHTML = data;

        block = document.createElement('div');
        block.classList.add('doctor__overflow');

        block.appendChild(a);
        block.appendChild(name);
        block.appendChild(description);

        target.appendChild(block);
    }

    _showBlock(target) {
        var block;

        block = target.querySelector('.doctor__overflow');

        setTimeout(function () { //если убрать setTimeout opacity выскакивает сразу, без transition
            block.classList.add('show');
        },100);
    }

    _hideBlock(target) {
        var block;

        block = target.querySelector('.doctor__overflow');

        setTimeout(function () { //если убрать setTimeout opacity выскакивает сразу, без transition
            block.classList.remove('show');
        },100);

        setTimeout(function () {
            block.remove();
        },300);
    }
}

var doc = new Doctor({
    element: document.getElementById('doctors')
});
/**
 * Created by che on 07.04.16.
 */
