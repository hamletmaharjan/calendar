/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {format, addDays, startOfWeek} from 'date-fns';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class AppCalendarContentHeader extends LitElement {
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
    
    .days {
      text-transform: uppercase;
      font-weight: 400;
      color: var(--text-color-light);
      font-size: 70%;
      padding: .75em 0;
      border-bottom: 1px solid var(--border-color);
    }
   
    
    
    
    
    `;
  }

  static get properties() {
    return {
      dateFormat: {type: String},
      currentMonth: {type: Object}
    };
  }

  constructor() {
    super();

    this.dateFormat = "EEEE";
      
  }

  contentHeaderTemplate() {
    // const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(this.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        html`<div class="col col-center" key="${i}">
          ${format(addDays(startDate, i), this.dateFormat)}
        </div>`
      );
    }
    return html`<div class="days row">${days}</div>`;
  }

  render() {
    // const dateFormat = "MMMM yyyy";
    return html`
      ${this.contentHeaderTemplate()}
    `;
  }

}

window.customElements.define('app-calendar-content-header', AppCalendarContentHeader);
