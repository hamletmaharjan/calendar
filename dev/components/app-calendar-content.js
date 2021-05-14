/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import {LitElement, html, css} from 'lit';
 import {format, addDays, startOfWeek} from 'date-fns';

import './app-calendar-content-header';
import './app-calendar-body';

 /**
  * An example element.
  *
  * @slot - This element has a slot
  * @csspart button - The button
  */
 export class AppCalendarContent extends LitElement {
   static get styles() {
     return css`
     
     
     `;
   }
 
  static get properties() {
    return {
      currentMonth: {type: Object},
      selectedDate: {type:Object}
    };
  }

  constructor() {
    super();
      
  }
 
   
  render() {
    // const dateFormat = "MMMM yyyy";
    return html`
      <div>
        <app-calendar-content-header
        .currentMonth="${this.currentMonth}"
        ></app-calendar-content-header>

        <app-calendar-body
          .selectedDate="${this.selectedDate}"
          .currentMonth="${this.currentMonth}"
          ></app-calendar-body>
      </div>
      
    `;
  }

}

 window.customElements.define('app-calendar-content', AppCalendarContent);
 