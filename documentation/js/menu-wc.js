'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">forReserve documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AnulationModalComponent.html" data-type="entity-link" >AnulationModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentsPage.html" data-type="entity-link" >AppointmentsPage</a>
                            </li>
                            <li class="link">
                                <a href="components/FlexCardComponent.html" data-type="entity-link" >FlexCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgetPasswordPage.html" data-type="entity-link" >ForgetPasswordPage</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePage.html" data-type="entity-link" >HomePage</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPage.html" data-type="entity-link" >LandingPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfilePage.html" data-type="entity-link" >ProfilePage</a>
                            </li>
                            <li class="link">
                                <a href="components/ServiceDetailsPage.html" data-type="entity-link" >ServiceDetailsPage</a>
                            </li>
                            <li class="link">
                                <a href="components/SigninComponent.html" data-type="entity-link" >SigninComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SignupPage.html" data-type="entity-link" >SignupPage</a>
                            </li>
                            <li class="link">
                                <a href="components/TabsPage.html" data-type="entity-link" >TabsPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ToolbarComponent.html" data-type="entity-link" >ToolbarComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockService.html" data-type="entity-link" >MockService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddressComponent.html" data-type="entity-link" >AddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Appointment.html" data-type="entity-link" >Appointment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Appointments.html" data-type="entity-link" >Appointments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrentOpeningHours.html" data-type="entity-link" >CurrentOpeningHours</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrentOpeningHoursPeriod.html" data-type="entity-link" >CurrentOpeningHoursPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FluffyClose.html" data-type="entity-link" >FluffyClose</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Geometry.html" data-type="entity-link" >Geometry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Geometry-1.html" data-type="entity-link" >Geometry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location-1.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location-2.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Locations.html" data-type="entity-link" >Locations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpeningHours.html" data-type="entity-link" >OpeningHours</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpeningHours-1.html" data-type="entity-link" >OpeningHours</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpeningHoursPeriod.html" data-type="entity-link" >OpeningHoursPeriod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo-1.html" data-type="entity-link" >Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceDetails.html" data-type="entity-link" >PlaceDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceInterface.html" data-type="entity-link" >PlaceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlusCode.html" data-type="entity-link" >PlusCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlusCode-1.html" data-type="entity-link" >PlusCode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PurpleClose.html" data-type="entity-link" >PurpleClose</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result-1.html" data-type="entity-link" >Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SliderInterface.html" data-type="entity-link" >SliderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Viewport.html" data-type="entity-link" >Viewport</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Viewport-1.html" data-type="entity-link" >Viewport</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});