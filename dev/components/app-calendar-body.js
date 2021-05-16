/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import {LitElement, html, css} from 'lit';
 import { format, addDays
  ,startOfWeek, endOfWeek, startOfMonth, endOfMonth} from 'date-fns';

  import './app-calendar-cell';


 /**
  * An example element.
  *
  * @slot - This element has a slot
  * @csspart button - The button
  */
export class AppCalendarBody extends LitElement {
   static get styles() {
     return css`
     
  
      
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
       selectedDate: {type: Object},
       currentMonth: {type: Object}
     };
   }
 
   constructor() {
     super();
 
     this.dateFormat = "EEEE";
       
   }
 
   contentBodyTemplate() {
    // const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(this.currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    // console.log(typeof(monthStart));
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        // console.log(typeof(formattedDate))
        const cloneDay = day;
        days.push(
          html`
          <div class="col">
          <app-calendar-cell .day="${day}"
          .monthStart="${monthStart}"
          .selectedDate="${this.selectedDate}"
          .formattedDate="${formattedDate}"
          ></app-calendar-cell>
          </div>
         
          
          `
        );
        day = addDays(day, 1);
      }
      rows.push(
        html`
        <div class="row" key=${day}>
          ${days}
        </div>
        `
      );
      days = [];
    }

    return html`
      <div class="body">${rows}</div>
    `;
  }
 
  render() {
    // const dateFormat = "MMMM yyyy";
    return html`
      ${this.contentBodyTemplate()}
    `;

  }

}

window.customElements.define('app-calendar-body', AppCalendarBody);
 