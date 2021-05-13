/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {format} from 'date-fns';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class AppCalenderHeader extends LitElement {
  static get styles() {
    return css`
    .icon {
      font-family: 'Material Icons', serif;
      font-style: normal;
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
    
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      font-feature-settings: 'liga';
    }
    
    
  
    
    
    /* GENERAL */
    
    * {
      box-sizing: border-box;
    }
    
    :host {
        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        font-size: 1em;
        font-weight: 300;
        line-height: 1.5;
        color: var(--text-color);
        background: var(--bg-color);
        position: relative;
    }
    
    
    
    /* GRID */
    
    .row {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }
    
    .row-middle {
      align-items: center;
    }
    
    .col {
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
    }
    
    .col-start {
      justify-content: flex-start;
      text-align: left;
    }
    
    .col-center {
      justify-content: center;
      text-align: center;
    }
    
    .col-end {
      justify-content: flex-end;
      text-align: right;
    }
    
    
    /* Calendar */
  
    .header {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 115%;
      padding: 1.5em 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .header .icon {
      cursor: pointer;
      transition: .15s ease-out;
    }
    
    .header .icon:hover {
      transform: scale(1.75);
      transition: .25s ease-out;
      color: var(--main-color);
    }
    
    .header .icon:first-of-type {
      margin-left: 1em;
    }
    
    .header .icon:last-of-type {
      margin-right: 1em;
    }
    
    .days {
      text-transform: uppercase;
      font-weight: 400;
      color: var(--text-color-light);
      font-size: 70%;
      padding: .75em 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .body .cell {
      position: relative;
      height: 5em;
      border-right: 1px solid var(--border-color);
      overflow: hidden;
      cursor: pointer;
      background: var(--neutral-color);
      transition: 0.25s ease-out;
    }
    
    .body .cell:hover {
      background: var(--bg-color);
      transition: 0.5s ease-out;
    }
    
    .body .selected {
      border-left: 10px solid transparent;
      border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
      border-image-slice: 1;
    }
    
    .body .row {
      border-bottom: 1px solid var(--border-color);
    }
    
    .body .row:last-child {
      border-bottom: none;
    }
    
    .body .cell:last-child {
      border-right: none;
    }
    
    .body .cell .number {
      position: absolute;
      font-size: 82.5%;
      line-height: 1;
      top: .75em;
      right: .75em;
      font-weight: 700;
    }
    
    .body .disabled {
      color: var(--text-color-light);
      pointer-events: none;
    }
    
    .body .cell .bg {
      font-weight: 700;
      line-height: 1;
      color: var(--main-color);
      opacity: 0;
      font-size: 8em;
      position: absolute;
      top: -.2em;
      right: -.05em;
      transition: .25s ease-out;
      letter-spacing: -.07em;
    }
    
    .body .cell:hover .bg, .body .selected .bg  {
      opacity: 0.05;
      transition: .5s ease-in;
    }
    
    .body .col {
      flex-grow: 0;
      flex-basis: calc(100%/7);
      width: calc(100%/7);
    }
    
    `;
  }

  static get properties() {
    return {
      dateFormat: {type: String},
      currentMonth: {type: Object},
      onNextMonthClick: {type: Function},
      onPrevMonthClick: {type:Function}
      
    };
  }

  constructor() {
    super();

    this.dateFormat = "MMMM yyyy";
      
  }

  render() {
    // const dateFormat = "MMMM yyyy";
    return html`
      <div class="header row flex-middle">
        <div class="col col-start">
          <div class="icon" @click="${this.onPrevMonthClick}">
            chevron_left
          </div>
        </div>
        <div class="col col-center">
          <span>
            ${format(this.currentMonth, this.dateFormat)}
          </span>
        </div>
        <div class="col col-end" @click="${this.onNextMonthClick}">
          <div class="icon">chevron_right</div>
        </div>
      </div>
    `;
  }

}

window.customElements.define('app-calender-header', AppCalenderHeader);
