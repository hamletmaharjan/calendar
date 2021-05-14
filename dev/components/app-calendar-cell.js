/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {isSameDay, isSameMonth} from 'date-fns';
/**
* An example element.
*
* @slot - This element has a slot
* @csspart button - The button
*/
export class AppCalendarCell extends LitElement {
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
    
    .calendar {
      display: block;
      position: relative;
      width: 100%;
      background: var(--neutral-color);
      border: 1px solid var(--border-color);
    }
    
  
    
    
    .cell {
      position: relative;
      height: 5em;
      border-right: 1px solid var(--border-color);
      overflow: hidden;
      cursor: pointer;
      background: var(--neutral-color);
      transition: 0.25s ease-out;
    }
    
    .cell:hover {
      background: var(--bg-color);
      transition: 0.5s ease-out;
    }
    
    .selected {
      border-left: 10px solid transparent;
      border-image: linear-gradient(45deg, #1a8fff 0%,#53cbf1 40%);
      border-image-slice: 1;
    }
    
    .row {
      border-bottom: 1px solid var(--border-color);
    }
    
    .row:last-child {
      border-bottom: none;
    }
    
    .cell:last-child {
      border-right: none;
    }
    
    .cell .number {
      position: absolute;
      font-size: 82.5%;
      line-height: 1;
      top: .75em;
      right: .75em;
      font-weight: 700;
    }
    
    .disabled {
      color: var(--text-color-light);
      pointer-events: none;
    }
    
    .cell .bg {
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
    
    .cell:hover .bg, .selected .bg  {
      opacity: 0.05;
      transition: .5s ease-in;
    }
    
    .col {
      flex-grow: 0;
      flex-basis: calc(100%/7);
      width: calc(100%/7);
    }
    `;
  }

  static get properties() {
    return {
      formattedDate: {type: Number},
      selectedDate: {type: Object},
      day: {type: Object},
      monthStart: {type:Object}
    };
  }

  constructor() {
    super();

    // this.dateFormat = "EEEE";
      
  }


  render() {
    // const dateFormat = "MMMM yyyy";
    return html`
      <div
        class="col cell ${
          !isSameMonth(this.day, this.monthStart)
            ? "disabled"
            : isSameDay(this.day, this.selectedDate) ? "selected" : ""
        }"
        key=${this.day}
      >
        <span class="number">${this.formattedDate}</span>
        <span class="bg">${this.formattedDate}</span>
      </div> 
    `;
  }

}

window.customElements.define('app-calendar-cell', AppCalendarCell);
