/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css, nothing} from 'lit';
import {addMonths, subMonths, isAfter, isBefore, isSameDay} from 'date-fns';

import './components/app-menu';
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
        font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
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
      events: {type:Array},

      showAppMenu: {type: Boolean},
      testDate: {type: Object}
    };
  }

  /**
   * constructor
   */
  constructor() {
    super();

    this.showAppMenu = false;
    this.currentMonth = new Date();
    this.selectedDate = new Date();
    this.testDate = new Date();
    this.events = [
      {"id":1, "start":"2021-05-17T08:00:00.000Z","end":"2021-05-17T17:00:00.000Z","title":"Business of Software Conference"},
      {"id":2, "start":"2021-05-17T08:00:00.000Z","end":"2021-05-17T17:00:00.000Z","title":"test"},
      {"id":3, "start":"2021-05-22T12:00:00.000Z","end":"2021-05-21T20:00:00.000Z","title":"All hands"},
      {"id":4, "start":"2021-05-18T08:00:00.000Z","end":"2021-05-18T17:00:00.000Z","title":"Business of Software Conference"},
      {"id":5, "start":"2021-05-18T08:00:00.000Z","end":"2021-05-18T17:00:00.000Z","title":"test"},
      {"id":6, "start":"2021-05-22T12:00:00.000Z","end":"2021-05-21T20:00:00.000Z","title":"All hands"},
      {"id":7, "start":"2021-05-29T12:00:00.000Z","end":"2021-05-39T20:00:00.000Z","title":"Community binge marathon"},
      {"id":8, "start":"2021-05-18T06:00:00.000Z","end":"2021-05-18T07:00:00.000Z","title":"Team Meeting"},
      {"id":9, "start":"2021-05-17T06:00:00.000Z","end":"2021-05-17T07:00:00.000Z","title":"some Meeting"}
    ];
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.handleShowAppMenu = this.handleShowAppMenu.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.counter = 0;
    this.shadowRoot.addEventListener('click', (e) => {
      // console.log(this.showAppMenu);
    
      if(e.target!=this.menu && this.showAppMenu){
        this.counter++;
        if(this.counter>1){
          console.log('shown', this.showAppMenu, e.target);
          this.handleCancel();
        }
        // console.log(e.target);
        // if(){
          

         
        // }
        
      }
    });
  }

  firstUpdated() {
    this.menu = this.shadowRoot.querySelector('app-menu');
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
    console.log('render');
    // console.log(isSameDay(new Date(this.events[0].start), this.currentMonth), this.currentMonth);
    return html`
      <div class="calendar">
        <app-calendar-header 
          .onPrevMonthClick="${this.prevMonth}"
          .onNextMonthClick="${this.nextMonth}"
          .currentMonth="${this.currentMonth}"
          ></app-calendar-header>
        <app-calendar-content 
          .events="${this.events}" 
          .currentMonth="${this.currentMonth}" 
          .selectedDate="${this.selectedDate}"
          .onMoreMenuClick="${this.handleShowAppMenu}"
          .onEventChange="${this.handleChangeEvent}"
          ></app-calendar-content>
        <app-menu .onCancel="${this.handleCancel}" .items="${this.events}" .day="${this.testDate}"></app-menu>
      </div>
    `;
  }

  handleShowAppMenu(e, items, day, pos) {
    this.showAppMenu = true;
    this.testDate = day;
    this.counter = 0;
    console.log('show', items);
    // console.log(items);
    // let filteredEvents = this.events.filter(eventItem => {
    //   return isSameDay(new Date(eventItem.start), thisday);
    // });
    // let menu = this.shadowRoot.querySelector('app-menu');
    // const positions = {left:e.clientX-10 + 'px', top: e.clientY+'px'};
    // this.menu.positions = {...positions};
    this.menu.positions = pos;
    // console.log(positions);
    this.menu.items = items;
    this.menu.day = day;
    this.menu.hidden = false;
  }

  handleCancel() {
    console.log('cancel')
    this.menu.hidden = true;
    this.showAppMenu = false;
  }

  handleChangeEvent(id,start) {
    // console.log(id, start);

    this.events = this.events.map((item) => {
      if(item['id'] == id) {
       
        item.start = start;
        // console.log('yes',item.start);
      } 
      return {...item}
    });
    // console.log(this.events);
  }

}
 
window.customElements.define('app-calendar', AppCalendar);
 