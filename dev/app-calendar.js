/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {addMonths, subMonths, isAfter, isBefore, isSameDay} from 'date-fns';

import './components/app-calendar-header';
import './components/app-calendar-cell.js';
import './components/app-calendar-content.js';
import './components/app-calendar-content-header.js';


/**
 * `<app-calendar>` Custom component to add a calendar
 *
 * <body>
 *  <app-calendar></app-calendar>
 *
 * @polymer
 * @litElement
 * @customElement
 */
export class AppCalendar extends LitElement {
  /**
   * Static getter styles
   * 
   * @returns {styles}
   */
  static get styles() {
    return css`
      /* GENERAL */
      * {
        box-sizing: border-box;
      }
      
      :host {
        background: var(--bg-color);
        position: relative;
      }
      
      /* Calendar */
      
      .calendar {
        display: block;
        position: relative;
        width: 100%;
        background: var(--neutral-color);
        border: 1px solid var(--border-color);
      }
    `;
  }

  /**
   * Static getter properties
   * 
   * @returns Object
   */
  static get properties() {
    return {
      /**
        * The name to say "Hello" to.
        */
      name: {type: String},

      /**
        * The object that holds the current date to represent current month
        */
      currentMonth: {type: Object},

      /**
        * The object that holds the current date
        */
      selectedDate: {type: Object},

      /**
       * array to hold all the events
       */
      events: {type:Array}
    };
  }

  /**
   * constructor
   */
  constructor() {
    super();

    this.currentMonth = new Date();
    this.selectedDate = new Date();
    this.events = [
      {"start":"2021-05-17T08:00:00.000Z","end":"2021-05-17T17:00:00.000Z","title":"Business of Software Conference"},
      {"start":"2021-05-17T08:00:00.000Z","end":"2021-05-17T17:00:00.000Z","title":"test"},
      {"start":"2021-05-22T12:00:00.000Z","end":"2021-05-21T20:00:00.000Z","title":"All hands"},
      {"start":"2021-05-29T12:00:00.000Z","end":"2021-05-39T20:00:00.000Z","title":"Community binge marathon"},
      {"start":"2021-05-17T06:00:00.000Z","end":"2021-05-17T07:00:00.000Z","title":"Product team mtg."}
    ];
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }


  nextMonth() {
    this.currentMonth = addMonths(this.currentMonth, 1);
  }

  prevMonth() {
    this.currentMonth = subMonths(this.currentMonth, 1);
  }

  /**
   * render method
   * 
   * @returns {customElements}
   */
  render() {
    console.log(isSameDay(new Date(this.events[0].start), this.currentMonth), this.currentMonth);
    return html`
      <div class="calendar">
        <app-calendar-header 
          .onPrevMonthClick="${this.prevMonth}"
          .onNextMonthClick="${this.nextMonth}"
          .currentMonth="${this.currentMonth}"
          ></app-calendar-header>
        <app-calendar-content .events="${this.events}" .currentMonth="${this.currentMonth}" .selectedDate="${this.selectedDate}"></app-calendar-content>
        
      </div>
    `;
  }

}
 
window.customElements.define('app-calendar', AppCalendar);
 