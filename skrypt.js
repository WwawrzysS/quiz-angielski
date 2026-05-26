/*
  Quiz Angielski PRO - skrypt.js
  Wersja split-v1: logika i baza danych przeniesione z index.html.
  Na tym etapie NIE zmienialiśmy działania gry.
*/
// ==========================================
        // BAZA DANYCH - SŁOWA I ZDANIA
        // ==========================================
        const rawWordsL1 = [{"pl":"Cześć","en":"Hello"},{"pl":"Tak","en":"Yes"},{"pl":"Nie","en":"No"},{"pl":"Proszę","en":"Please"},{"pl":"Dziękuję","en":"Thank you"},{"pl":"Przepraszam","en":"Excuse me"},{"pl":"Pomoc","en":"Help"},{"pl":"Toaleta","en":"Toilet"},{"pl":"Woda","en":"Water"},{"pl":"Kawa","en":"Coffee"},{"pl":"Herbata","en":"Tea"},{"pl":"Piwo","en":"Beer"},{"pl":"Wino","en":"Wine"},{"pl":"Menu","en":"Menu"},{"pl":"Rachunek","en":"Bill"},{"pl":"Gotówka","en":"Cash"},{"pl":"Karta","en":"Card"},{"pl":"Cena","en":"Price"},{"pl":"Tanie","en":"Cheap"},{"pl":"Drogie","en":"Expensive"},{"pl":"Hotel","en":"Hotel"},{"pl":"Pokój","en":"Room"},{"pl":"Klucz","en":"Key"},{"pl":"Recepcja","en":"Reception"},{"pl":"Śniadanie","en":"Breakfast"},{"pl":"Ręcznik","en":"Towel"},{"pl":"Łóżko","en":"Bed"},{"pl":"Winda","en":"Elevator"},{"pl":"Lotnisko","en":"Airport"},{"pl":"Bilet","en":"Ticket"},{"pl":"Paszport","en":"Passport"},{"pl":"Bagaż","en":"Luggage"},{"pl":"Bramka","en":"Gate"},{"pl":"Pociąg","en":"Train"},{"pl":"Peron","en":"Platform"},{"pl":"Autobus","en":"Bus"},{"pl":"Taksówka","en":"Taxi"},{"pl":"Przystanek","en":"Stop"},{"pl":"Dworzec","en":"Station"},{"pl":"Mapa","en":"Map"},{"pl":"Lewo","en":"Left"},{"pl":"Prawo","en":"Right"},{"pl":"Prosto","en":"Straight"},{"pl":"Blisko","en":"Near"},{"pl":"Daleko","en":"Far"},{"pl":"Plaża","en":"Beach"},{"pl":"Muzeum","en":"Museum"},{"pl":"Apteka","en":"Pharmacy"},{"pl":"Lekarz","en":"Doctor"},{"pl":"Policja","en":"Police"}];

        const rawSentencesL1 = [{"pl":"Dzień dobry.","en":"Good morning."},{"pl":"Dobry wieczór.","en":"Good evening."},{"pl":"Dziękuję bardzo.","en":"Thank you very much."},{"pl":"Przepraszam.","en":"Excuse me."},{"pl":"Nie rozumiem.","en":"I do not understand."},{"pl":"Proszę mówić wolniej.","en":"Please speak slowly."},{"pl":"Czy mówisz po angielsku?","en":"Do you speak English?"},{"pl":"Potrzebuję pomocy.","en":"I need help."},{"pl":"Gdzie jest toaleta?","en":"Where is the toilet?"},{"pl":"Ile to kosztuje?","en":"How much is it?"},{"pl":"Poproszę wodę.","en":"Water, please."},{"pl":"Poproszę kawę.","en":"Coffee, please."},{"pl":"Menu poproszę.","en":"The menu, please."},{"pl":"Rachunek poproszę.","en":"The bill, please."},{"pl":"Płacę kartą.","en":"I pay by card."},{"pl":"Płacę gotówką.","en":"I pay in cash."},{"pl":"Stolik dla dwóch osób.","en":"A table for two."},{"pl":"To jest pyszne.","en":"It is delicious."},{"pl":"Nie chcę ostrego.","en":"I do not want spicy."},{"pl":"Jestem wegetarianinem.","en":"I am vegetarian."},{"pl":"Mam rezerwację.","en":"I have a reservation."},{"pl":"Klucz poproszę.","en":"The key, please."},{"pl":"Gdzie jest mój pokój?","en":"Where is my room?"},{"pl":"O której śniadanie?","en":"What time is breakfast?"},{"pl":"Potrzebuję ręcznika.","en":"I need a towel."},{"pl":"Wi-Fi nie działa.","en":"The Wi-Fi does not work."},{"pl":"Hasło do Wi-Fi?","en":"The Wi-Fi password?"},{"pl":"Gdzie jest recepcja?","en":"Where is reception?"},{"pl":"Potrzebuję taksówki.","en":"I need a taxi."},{"pl":"Na lotnisko, proszę.","en":"To the airport, please."},{"pl":"Poproszę bilet.","en":"A ticket, please."},{"pl":"Dwa bilety, proszę.","en":"Two tickets, please."},{"pl":"Gdzie jest peron?","en":"Where is the platform?"},{"pl":"Czy to ten pociąg?","en":"Is this the train?"},{"pl":"Gdzie jest autobus?","en":"Where is the bus?"},{"pl":"Gdzie mam wysiąść?","en":"Where do I get off?"},{"pl":"Proszę tu zatrzymać.","en":"Please stop here."},{"pl":"Idź prosto.","en":"Go straight."},{"pl":"Skręć w lewo.","en":"Turn left."},{"pl":"Skręć w prawo.","en":"Turn right."},{"pl":"Gdzie jest plaża?","en":"Where is the beach?"},{"pl":"Gdzie jest muzeum?","en":"Where is the museum?"},{"pl":"Proszę pokazać na mapie.","en":"Please show me on the map."},{"pl":"Zgubiłem się.","en":"I am lost."},{"pl":"To jest blisko?","en":"Is it near?"},{"pl":"To jest daleko?","en":"Is it far?"},{"pl":"Potrzebuję lekarza.","en":"I need a doctor."},{"pl":"Gdzie jest apteka?","en":"Where is the pharmacy?"},{"pl":"Zadzwoń na policję.","en":"Call the police."},{"pl":"Dziękuję za pomoc.","en":"Thank you for your help."}];

        const rawWordsL2 = [{"pl":"Odprawa","en":"Check-in"},{"pl":"Karta pokładowa","en":"Boarding pass"},{"pl":"Kontrola bezpieczeństwa","en":"Security check"},{"pl":"Odlot","en":"Departure"},{"pl":"Przylot","en":"Arrival"},{"pl":"Opóźnienie","en":"Delay"},{"pl":"Walizka","en":"Suitcase"},{"pl":"Plecak","en":"Backpack"},{"pl":"Miejsce","en":"Seat"},{"pl":"Okno","en":"Window"},{"pl":"Kasa biletowa","en":"Ticket office"},{"pl":"Biletomat","en":"Ticket machine"},{"pl":"Rozkład jazdy","en":"Timetable"},{"pl":"Przesiadka","en":"Change"},{"pl":"Pociąg bezpośredni","en":"Direct train"},{"pl":"Centrum","en":"City center"},{"pl":"Postój taksówek","en":"Taxi rank"},{"pl":"Adres","en":"Address"},{"pl":"Przewodnik","en":"Guide"},{"pl":"Informacja turystyczna","en":"Tourist information"},{"pl":"Rezerwacja","en":"Reservation"},{"pl":"Zameldowanie","en":"Check-in"},{"pl":"Wymeldowanie","en":"Check-out"},{"pl":"Widok na morze","en":"Sea view"},{"pl":"Klimatyzacja","en":"Air conditioning"},{"pl":"Ciepła woda","en":"Hot water"},{"pl":"Przechowalnia bagażu","en":"Luggage storage"},{"pl":"Sejf","en":"Safe"},{"pl":"Basen","en":"Pool"},{"pl":"Balkon","en":"Balcony"},{"pl":"Przystawka","en":"Starter"},{"pl":"Danie główne","en":"Main course"},{"pl":"Deser","en":"Dessert"},{"pl":"Kurczak","en":"Chicken"},{"pl":"Ryba","en":"Fish"},{"pl":"Wołowina","en":"Beef"},{"pl":"Sałatka","en":"Salad"},{"pl":"Sól","en":"Salt"},{"pl":"Pieprz","en":"Pepper"},{"pl":"Napiwek","en":"Tip"},{"pl":"Pamiątki","en":"Souvenirs"},{"pl":"Zamek","en":"Castle"},{"pl":"Katedra","en":"Cathedral"},{"pl":"Rynek","en":"Market square"},{"pl":"Bilet wstępu","en":"Entrance ticket"},{"pl":"Godziny otwarcia","en":"Opening hours"},{"pl":"Wycieczka","en":"Tour"},{"pl":"Rejs","en":"Boat trip"},{"pl":"Plaża","en":"Beach"},{"pl":"Ratownik","en":"Lifeguard"},{"pl":"Apteka całodobowa","en":"24-hour pharmacy"},{"pl":"Szpital","en":"Hospital"},{"pl":"Karetka","en":"Ambulance"},{"pl":"Ból głowy","en":"Headache"},{"pl":"Gorączka","en":"Fever"},{"pl":"Alergia","en":"Allergy"},{"pl":"Lekarstwo","en":"Medicine"},{"pl":"Dokumenty","en":"Documents"},{"pl":"Portfel","en":"Wallet"},{"pl":"Telefon","en":"Phone"},{"pl":"Promocja","en":"Discount"},{"pl":"Rozmiar","en":"Size"},{"pl":"Kolor","en":"Color"},{"pl":"Paragon","en":"Receipt"},{"pl":"Zwrot","en":"Return"},{"pl":"Torba","en":"Bag"},{"pl":"Sklep spożywczy","en":"Grocery store"},{"pl":"Piekarnia","en":"Bakery"},{"pl":"Krem z filtrem","en":"Sunscreen"},{"pl":"Okulary przeciwsłoneczne","en":"Sunglasses"}];

        const rawSentencesL2 = [{"pl":"Gdzie mogę się odprawić?","en":"Where can I check in?"},{"pl":"Mój lot jest opóźniony.","en":"My flight is delayed."},{"pl":"Gdzie jest bramka numer pięć?","en":"Where is gate number five?"},{"pl":"Zgubiłem bagaż.","en":"I lost my luggage."},{"pl":"Mam tylko bagaż podręczny.","en":"I have only hand luggage."},{"pl":"Czy to miejsce jest wolne?","en":"Is this seat free?"},{"pl":"Potrzebuję karty pokładowej.","en":"I need a boarding pass."},{"pl":"Gdzie jest kontrola paszportowa?","en":"Where is passport control?"},{"pl":"O której zaczyna się wejście na pokład?","en":"What time is boarding?"},{"pl":"Gdzie mogę odebrać walizkę?","en":"Where can I collect my suitcase?"},{"pl":"Poproszę bilet w obie strony.","en":"A return ticket, please."},{"pl":"Czy to jest pociąg bezpośredni?","en":"Is this a direct train?"},{"pl":"Z którego peronu odjeżdża?","en":"Which platform does it leave from?"},{"pl":"Chcę jechać do centrum.","en":"I want to go to the city center."},{"pl":"Ile trwa podróż?","en":"How long is the trip?"},{"pl":"Gdzie mogę kupić bilet?","en":"Where can I buy a ticket?"},{"pl":"Biletomat nie działa.","en":"The ticket machine does not work."},{"pl":"Czy muszę się przesiąść?","en":"Do I need to change trains?"},{"pl":"Proszę zawieźć mnie pod ten adres.","en":"Please take me to this address."},{"pl":"Czy może pan wezwać taksówkę?","en":"Can you call a taxi?"},{"pl":"Mam rezerwację na to nazwisko.","en":"I have a reservation under this name."},{"pl":"O której jest wymeldowanie?","en":"What time is check-out?"},{"pl":"Czy śniadanie jest w cenie?","en":"Is breakfast included?"},{"pl":"Klimatyzacja nie działa.","en":"The air conditioning does not work."},{"pl":"Nie ma ciepłej wody.","en":"There is no hot water."},{"pl":"Czy mogę zostawić tu bagaż?","en":"Can I leave my luggage here?"},{"pl":"Potrzebuję jeszcze jednego ręcznika.","en":"I need one more towel."},{"pl":"Klucz do pokoju nie działa.","en":"The room key does not work."},{"pl":"Czy możemy dostać pokój z widokiem na morze?","en":"Can we have a room with a sea view?"},{"pl":"Chciałbym się zameldować.","en":"I would like to check in."},{"pl":"Czy mają państwo menu po angielsku?","en":"Do you have an English menu?"},{"pl":"Co pan poleca?","en":"What do you recommend?"},{"pl":"Czy to danie jest ostre?","en":"Is this dish spicy?"},{"pl":"Jestem uczulony na orzechy.","en":"I am allergic to nuts."},{"pl":"Chcielibyśmy usiąść na zewnątrz.","en":"We would like to sit outside."},{"pl":"To nie jest moje zamówienie.","en":"This is not my order."},{"pl":"Czy możemy zapłacić osobno?","en":"Can we pay separately?"},{"pl":"Reszty nie trzeba.","en":"Keep the change."},{"pl":"Czy mogę prosić o lód?","en":"Can I have some ice?"},{"pl":"Jedzenie było pyszne.","en":"The food was delicious."},{"pl":"Gdzie jest informacja turystyczna?","en":"Where is the tourist information office?"},{"pl":"O której otwiera się muzeum?","en":"What time does the museum open?"},{"pl":"Ile kosztuje bilet wstępu?","en":"How much is the entrance ticket?"},{"pl":"Czy mogę tutaj robić zdjęcia?","en":"Can I take photos here?"},{"pl":"Gdzie mogę kupić pamiątki?","en":"Where can I buy souvenirs?"},{"pl":"Czy plaża jest daleko stąd?","en":"Is the beach far from here?"},{"pl":"Gdzie jest miejsce spotkania?","en":"Where is the meeting point?"},{"pl":"Czy może pan pokazać drogę powrotną?","en":"Can you show me the way back?"},{"pl":"Czy jest dziś rejs łodzią?","en":"Is there a boat trip today?"},{"pl":"Gdzie jest stare miasto?","en":"Where is the old town?"},{"pl":"Potrzebuję szybko lekarza.","en":"I need a doctor quickly."},{"pl":"Gdzie jest najbliższy szpital?","en":"Where is the nearest hospital?"},{"pl":"Mam gorączkę.","en":"I have a fever."},{"pl":"Boli mnie głowa.","en":"My head hurts."},{"pl":"Zgubiłem paszport.","en":"I lost my passport."},{"pl":"Ukradli mi portfel.","en":"My wallet was stolen."},{"pl":"Proszę wezwać karetkę.","en":"Please call an ambulance."},{"pl":"Gdzie jest komisariat policji?","en":"Where is the police station?"},{"pl":"Potrzebuję lekarstwa.","en":"I need medicine."},{"pl":"Czy może pan to zapisać?","en":"Can you write it down?"}];

        const rawWordsL3 = [{"pl":"Reklamacja","en":"Complaint"},{"pl":"Zwrot pieniędzy","en":"Refund"},{"pl":"Ubezpieczenie","en":"Insurance"},{"pl":"Odszkodowanie","en":"Compensation"},{"pl":"Ambasada","en":"Embassy"},{"pl":"Zgłoszenie","en":"Report"},{"pl":"Kradzież","en":"Theft"},{"pl":"Zagubiony","en":"Lost"},{"pl":"Odwołany lot","en":"Cancelled flight"},{"pl":"Nadwaga bagażu","en":"Excess baggage"},{"pl":"Wypożyczalnia","en":"Rental office"},{"pl":"Kaucja","en":"Deposit"},{"pl":"Prawo jazdy","en":"Driving licence"},{"pl":"Mandat","en":"Fine"},{"pl":"Awaria","en":"Breakdown"},{"pl":"Pomoc drogowa","en":"Roadside assistance"},{"pl":"Recepcjonista","en":"Receptionist"},{"pl":"Kierownik","en":"Manager"},{"pl":"Obsługa","en":"Service"},{"pl":"Rezerwować","en":"To book"},{"pl":"Odwołać","en":"To cancel"},{"pl":"Zmienić","en":"To change"},{"pl":"Polecić","en":"To recommend"},{"pl":"Wyjaśnić","en":"To explain"},{"pl":"Potwierdzić","en":"To confirm"},{"pl":"Przypomnieć","en":"To remind"},{"pl":"Problem","en":"Problem"},{"pl":"Rozwiązanie","en":"Solution"},{"pl":"Bezpieczny","en":"Safe"},{"pl":"Niebezpieczny","en":"Dangerous"},{"pl":"Lokalny","en":"Local"},{"pl":"Tradycyjny","en":"Traditional"},{"pl":"Popularny","en":"Popular"},{"pl":"Spokojny","en":"Quiet"},{"pl":"Głośny","en":"Loud"},{"pl":"Zajęty","en":"Busy"},{"pl":"Dostępny","en":"Available"},{"pl":"Zarezerwowany","en":"Reserved"},{"pl":"Gotowy","en":"Ready"},{"pl":"Ważny","en":"Valid"},{"pl":"Nieważny","en":"Invalid"},{"pl":"Trasa","en":"Route"},{"pl":"Objazd","en":"Detour"},{"pl":"Kolejka","en":"Queue"},{"pl":"Kontrola","en":"Check"},{"pl":"Opłata","en":"Fee"},{"pl":"Paragon","en":"Receipt"},{"pl":"Faktura","en":"Invoice"},{"pl":"Podpis","en":"Signature"},{"pl":"Formularz","en":"Form"}];

        const rawSentencesL3 = [{"pl":"Could you recommend a good local restaurant?","en":"Could you recommend a good local restaurant?"},{"pl":"We booked a table under my wife’s name.","en":"We booked a table under my wife’s name."},{"pl":"I think there is a problem with the air conditioning.","en":"I think there is a problem with the air conditioning."},{"pl":"Can we change our reservation for tomorrow?","en":"Can we change our reservation for tomorrow?"},{"pl":"Our flight was cancelled and we need help.","en":"Our flight was cancelled and we need help."},{"pl":"I would like to speak with the manager, please.","en":"I would like to speak with the manager, please."},{"pl":"This is different from what I ordered.","en":"This is different from what I ordered."},{"pl":"Could you explain this charge on the bill?","en":"Could you explain this charge on the bill?"},{"pl":"We are looking for a quiet beach for families.","en":"We are looking for a quiet beach for families."},{"pl":"Is it safe to walk here at night?","en":"Is it safe to walk here at night?"},{"pl":"My luggage is too heavy and I need to pay extra.","en":"My luggage is too heavy and I need to pay extra."},{"pl":"Can you help me fill in this form?","en":"Can you help me fill in this form?"},{"pl":"I need a written confirmation for my insurance.","en":"I need a written confirmation for my insurance."},{"pl":"We missed the train because the flight was delayed.","en":"We missed the train because the flight was delayed."},{"pl":"Where can I report a stolen phone?","en":"Where can I report a stolen phone?"},{"pl":"I am not sure which ticket we need.","en":"I am not sure which ticket we need."},{"pl":"Could you write the address in my phone?","en":"Could you write the address in my phone?"},{"pl":"We would like to try something traditional.","en":"We would like to try something traditional."},{"pl":"Can you make it less spicy, please?","en":"Can you make it less spicy, please?"},{"pl":"Do we need to book the tour in advance?","en":"Do we need to book the tour in advance?"},{"pl":"The room is noisy and we cannot sleep.","en":"The room is noisy and we cannot sleep."},{"pl":"Can we get a different room?","en":"Can we get a different room?"},{"pl":"The card machine did not print a receipt.","en":"The card machine did not print a receipt."},{"pl":"I paid twice by mistake.","en":"I paid twice by mistake."},{"pl":"How do we get back to the hotel from here?","en":"How do we get back to the hotel from here?"},{"pl":"Could you tell us the best route?","en":"Could you tell us the best route?"},{"pl":"We need tickets for two adults and two children.","en":"We need tickets for two adults and two children."},{"pl":"Is there a discount for teenagers?","en":"Is there a discount for teenagers?"},{"pl":"Can we sit somewhere with a better view?","en":"Can we sit somewhere with a better view?"},{"pl":"Please call me when the taxi arrives.","en":"Please call me when the taxi arrives."},{"pl":"I would like to cancel this booking.","en":"I would like to cancel this booking."},{"pl":"Can I get my deposit back?","en":"Can I get my deposit back?"},{"pl":"The rental car has a scratch here.","en":"The rental car has a scratch here."},{"pl":"I need roadside assistance now.","en":"I need roadside assistance now."},{"pl":"Can you send the location by message?","en":"Can you send the location by message?"},{"pl":"We are travelling with children.","en":"We are travelling with children."},{"pl":"We need something simple and not expensive.","en":"We need something simple and not expensive."},{"pl":"Could you repeat the last part?","en":"Could you repeat the last part?"},{"pl":"I understood the price, but not the time.","en":"I understood the price, but not the time."},{"pl":"Thank you, that explains everything.","en":"Thank you, that explains everything."}];

        const rawNumbers = [{"pl":"Jeden","en":"One"},{"pl":"Dwa","en":"Two"},{"pl":"Trzy","en":"Three"},{"pl":"Cztery","en":"Four"},{"pl":"Pięć","en":"Five"},{"pl":"Sześć","en":"Six"},{"pl":"Siedem","en":"Seven"},{"pl":"Osiem","en":"Eight"},{"pl":"Dziewięć","en":"Nine"},{"pl":"Dziesięć","en":"Ten"},{"pl":"Jedenaście","en":"Eleven"},{"pl":"Dwanaście","en":"Twelve"},{"pl":"Piętnaście","en":"Fifteen"},{"pl":"Dwadzieścia","en":"Twenty"},{"pl":"Trzydzieści","en":"Thirty"},{"pl":"Czterdzieści","en":"Forty"},{"pl":"Pięćdziesiąt","en":"Fifty"},{"pl":"Sto","en":"One hundred"},{"pl":"Tysiąc","en":"One thousand"},{"pl":"Pół","en":"Half"},{"pl":"Dwa bilety","en":"Two tickets"},{"pl":"Trzy osoby","en":"Three people"},{"pl":"Pokój numer pięć","en":"Room number five"},{"pl":"Peron trzeci","en":"Platform three"},{"pl":"Bramka dziewiąta","en":"Gate nine"},{"pl":"O ósmej","en":"At eight"},{"pl":"O dziesiątej","en":"At ten"},{"pl":"Za pięć minut","en":"In five minutes"},{"pl":"Za pół godziny","en":"In half an hour"},{"pl":"Trzy dni","en":"Three days"},{"pl":"Dwie noce","en":"Two nights"},{"pl":"Pięć euro","en":"Five euros"},{"pl":"Dziesięć euro","en":"Ten euros"},{"pl":"Dwadzieścia euro","en":"Twenty euros"},{"pl":"Pięćdziesiąt centów","en":"Fifty cents"},{"pl":"Dwa kilometry","en":"Two kilometers"},{"pl":"Sto metrów","en":"One hundred meters"},{"pl":"Trzydzieści stopni","en":"Thirty degrees"},{"pl":"Pierwszy","en":"First"},{"pl":"Drugi","en":"Second"}];

        function sliceIntoStages(arr, itemsPerStage) {
            const res = {};
            let stage = 1;
            for (let i = 0; i < arr.length; i += itemsPerStage) {
                res[stage] = arr.slice(i, i + itemsPerStage);
                stage++;
            }
            return res;
        }

        // ==========================================
        // FOOD & SPEAKING UPDATE — jedzenie, owoce, lody, napoje, plaża
        // ==========================================
        const foodWordsL1 = [
            {pl:"Jabłko",en:"Apple"},{pl:"Banan",en:"Banana"},{pl:"Pomarańcza",en:"Orange"},{pl:"Cytryna",en:"Lemon"},{pl:"Truskawka",en:"Strawberry"},{pl:"Arbuz",en:"Watermelon"},{pl:"Winogrona",en:"Grapes"},{pl:"Brzoskwinia",en:"Peach"},{pl:"Ananas",en:"Pineapple"},{pl:"Kokos",en:"Coconut"},
            {pl:"Lody",en:"Ice cream"},{pl:"Gałka lodów",en:"Scoop"},{pl:"Rożek",en:"Cone"},{pl:"Kubek",en:"Cup"},{pl:"Waniliowe",en:"Vanilla"},{pl:"Czekoladowe",en:"Chocolate"},{pl:"Truskawkowe",en:"Strawberry"},{pl:"Cytrynowe",en:"Lemon"},{pl:"Pistacjowe",en:"Pistachio"},{pl:"Bita śmietana",en:"Whipped cream"},
            {pl:"Woda niegazowana",en:"Still water"},{pl:"Woda gazowana",en:"Sparkling water"},{pl:"Sok",en:"Juice"},{pl:"Sok pomarańczowy",en:"Orange juice"},{pl:"Sok jabłkowy",en:"Apple juice"},{pl:"Lemoniada",en:"Lemonade"},{pl:"Cola",en:"Cola"},{pl:"Butelka",en:"Bottle"},{pl:"Szklanka",en:"Glass"},{pl:"Słomka",en:"Straw"},
            {pl:"Ryba",en:"Fish"},{pl:"Kurczak",en:"Chicken"},{pl:"Burger",en:"Burger"},{pl:"Pizza",en:"Pizza"},{pl:"Kanapka",en:"Sandwich"},{pl:"Sałatka",en:"Salad"},{pl:"Zupa",en:"Soup"},{pl:"Makaron",en:"Pasta"},{pl:"Ryż",en:"Rice"},{pl:"Frytki",en:"Fries"},
            {pl:"Ser",en:"Cheese"},{pl:"Szynka",en:"Ham"},{pl:"Jajko",en:"Egg"},{pl:"Sól",en:"Salt"},{pl:"Pieprz",en:"Pepper"},{pl:"Sos",en:"Sauce"},{pl:"Lody na plaży",en:"Beach ice cream"},{pl:"Bar na plaży",en:"Beach bar"},{pl:"Przekąska",en:"Snack"},{pl:"Na wynos",en:"Takeaway"}
        ];

        const foodSentencesL1 = [
            {pl:"Poproszę lody.",en:"Ice cream, please."},{pl:"Jedną gałkę, proszę.",en:"One scoop, please."},{pl:"Dwie gałki, proszę.",en:"Two scoops, please."},{pl:"Poproszę rożek.",en:"A cone, please."},{pl:"Poproszę kubek.",en:"A cup, please."},{pl:"Poproszę lody waniliowe.",en:"Vanilla ice cream, please."},{pl:"Poproszę lody czekoladowe.",en:"Chocolate ice cream, please."},{pl:"Poproszę lody truskawkowe.",en:"Strawberry ice cream, please."},{pl:"Czy macie lody cytrynowe?",en:"Do you have lemon ice cream?"},{pl:"Czy macie lody pistacjowe?",en:"Do you have pistachio ice cream?"},
            {pl:"Poproszę wodę niegazowaną.",en:"Still water, please."},{pl:"Poproszę wodę gazowaną.",en:"Sparkling water, please."},{pl:"Poproszę sok pomarańczowy.",en:"Orange juice, please."},{pl:"Poproszę lemoniadę.",en:"Lemonade, please."},{pl:"Poproszę butelkę wody.",en:"A bottle of water, please."},{pl:"Poproszę szklankę wody.",en:"A glass of water, please."},{pl:"Bez lodu, proszę.",en:"No ice, please."},{pl:"Z lodem, proszę.",en:"With ice, please."},{pl:"Dla mnie kawa.",en:"Coffee for me."},{pl:"Dla mnie herbata.",en:"Tea for me."},
            {pl:"Poproszę menu.",en:"The menu, please."},{pl:"Co pan poleca?",en:"What do you recommend?"},{pl:"Poproszę rybę.",en:"Fish, please."},{pl:"Poproszę kurczaka.",en:"Chicken, please."},{pl:"Poproszę frytki.",en:"Fries, please."},{pl:"Poproszę sałatkę.",en:"Salad, please."},{pl:"Poproszę pizzę.",en:"Pizza, please."},{pl:"Poproszę kanapkę.",en:"A sandwich, please."},{pl:"Czy to jest ostre?",en:"Is it spicy?"},{pl:"Nie chcę ostrego.",en:"I do not want spicy."},
            {pl:"Na miejscu czy na wynos?",en:"For here or takeaway?"},{pl:"Na wynos, proszę.",en:"Takeaway, please."},{pl:"Tutaj, proszę.",en:"For here, please."},{pl:"Ile kosztują lody?",en:"How much is the ice cream?"},{pl:"Ile kosztuje kawa?",en:"How much is the coffee?"},{pl:"Rachunek poproszę.",en:"The bill, please."},{pl:"Płacę kartą.",en:"I pay by card."},{pl:"Czy mogę zapłacić kartą?",en:"Can I pay by card?"},{pl:"To jest bardzo dobre.",en:"It is very good."},{pl:"Dziękuję, było pyszne.",en:"Thank you, it was delicious."}
        ];

        const foodWordsL2 = [
            {pl:"Przystawka",en:"Starter"},{pl:"Danie główne",en:"Main course"},{pl:"Deser",en:"Dessert"},{pl:"Napoje",en:"Drinks"},{pl:"Menu dla dzieci",en:"Kids menu"},{pl:"Kelner",en:"Waiter"},{pl:"Kelnerka",en:"Waitress"},{pl:"Stolik",en:"Table"},{pl:"Rezerwacja",en:"Reservation"},{pl:"Napiwek",en:"Tip"},
            {pl:"Rachunek osobno",en:"Separate bill"},{pl:"Bez mięsa",en:"No meat"},{pl:"Bez sera",en:"No cheese"},{pl:"Bez cebuli",en:"No onion"},{pl:"Alergia",en:"Allergy"},{pl:"Orzechy",en:"Nuts"},{pl:"Owoce morza",en:"Seafood"},{pl:"Gluten",en:"Gluten"},{pl:"Mleko",en:"Milk"},{pl:"Jajka",en:"Eggs"},
            {pl:"Talerz",en:"Plate"},{pl:"Widelec",en:"Fork"},{pl:"Nóż",en:"Knife"},{pl:"Łyżka",en:"Spoon"},{pl:"Serwetka",en:"Napkin"},{pl:"Parasol",en:"Umbrella"},{pl:"Leżak",en:"Sunbed"},{pl:"Cień",en:"Shade"},{pl:"Paragon",en:"Receipt"},{pl:"Zamówienie",en:"Order"}
        ];

        const foodSentencesL2 = [
            {pl:"Chciałbym zarezerwować stolik.",en:"I would like to book a table."},{pl:"Stolik dla czterech osób, proszę.",en:"A table for four, please."},{pl:"Czy macie menu po angielsku?",en:"Do you have an English menu?"},{pl:"Czy macie menu dla dzieci?",en:"Do you have a kids menu?"},{pl:"Poproszę rachunek osobno.",en:"Separate bills, please."},{pl:"Czy obsługa jest wliczona?",en:"Is service included?"},{pl:"Czy mogę dostać paragon?",en:"Can I have a receipt?"},{pl:"Zamawialiśmy dziesięć minut temu.",en:"We ordered ten minutes ago."},{pl:"To nie jest moje zamówienie.",en:"This is not my order."},{pl:"Przepraszam, brakuje jednej porcji.",en:"Excuse me, one portion is missing."},
            {pl:"Mam alergię na orzechy.",en:"I am allergic to nuts."},{pl:"Czy to danie zawiera gluten?",en:"Does this dish contain gluten?"},{pl:"Bez cebuli, proszę.",en:"No onion, please."},{pl:"Bez sera, proszę.",en:"No cheese, please."},{pl:"Czy to jest wegetariańskie?",en:"Is it vegetarian?"},{pl:"Czy mogę dostać więcej sosu?",en:"Can I have more sauce?"},{pl:"Poproszę dodatkową serwetkę.",en:"An extra napkin, please."},{pl:"Poproszę nóż i widelec.",en:"A knife and fork, please."},{pl:"Czy możemy usiąść w cieniu?",en:"Can we sit in the shade?"},{pl:"Czy możemy usiąść przy plaży?",en:"Can we sit by the beach?"}
        ];

        rawWordsL1.push(...foodWordsL1);
        rawSentencesL1.push(...foodSentencesL1);
        rawWordsL2.push(...foodWordsL2);
        rawSentencesL2.push(...foodSentencesL2);

        const database = {
            1: { words: sliceIntoStages(rawWordsL1, 15), sentences: sliceIntoStages(rawSentencesL1, 12) },
            2: { words: sliceIntoStages(rawWordsL2, 15), sentences: sliceIntoStages(rawSentencesL2, 12) },
            3: { words: sliceIntoStages(rawWordsL3, 15), sentences: sliceIntoStages(rawSentencesL3, 12) }
        };
        const numbersDatabase = {
            1: sliceIntoStages(rawNumbers, 8),
            2: sliceIntoStages(rawNumbers, 8),
            3: sliceIntoStages(rawNumbers, 8)
        };

        // ==========================================
        // LEKCJE Z NOTATEK ONLINE
        // Lekcja 1: rzeczy na wakacje + Do you have/take + godziny
        // ==========================================
        const lessonDatabase = {
            1: {
                title: "Wakacyjne pakowanie i godziny",
                badge: "🎒 Gotowy na wakacje",
                items: [
                    {pl:"przejściówka / adapter", en:"adaptor"},
                    {pl:"plecak", en:"backpack"},
                    {pl:"szczotka", en:"brush"},
                    {pl:"czapka z daszkiem", en:"baseball cap"},
                    {pl:"grzebień", en:"comb"},
                    {pl:"japonki", en:"flip-flops"},
                    {pl:"przewodnik", en:"guidebook"},
                    {pl:"suszarka do włosów", en:"hairdryer"},
                    {pl:"środek na owady", en:"insect repellent"},
                    {pl:"makijaż / kosmetyki", en:"make-up"},
                    {pl:"karta pamięci", en:"memory card"},
                    {pl:"pieniądze", en:"money"},
                    {pl:"nożyczki do paznokci", en:"nail scissors"},
                    {pl:"ładowarka do telefonu", en:"phone charger"},
                    {pl:"piżama", en:"pyjamas"},
                    {pl:"kurtka przeciwdeszczowa", en:"raincoat"},
                    {pl:"maszynka do golenia", en:"razor"},
                    {pl:"kapelusz przeciwsłoneczny", en:"sun hat"},
                    {pl:"krem z filtrem", en:"sunscreen"},
                    {pl:"kąpielówki", en:"swimming trunks"},
                    {pl:"strój kąpielowy", en:"swimsuit"},
                    {pl:"szczoteczka do zębów", en:"toothbrush"},
                    {pl:"pasta do zębów", en:"toothpaste"},
                    {pl:"ręcznik", en:"towel"},
                    {pl:"kosmetyczka podróżna", en:"wash bag"},

                    {pl:"Czy masz plecak?", en:"Do you have a backpack?"},
                    {pl:"Tak, mam.", en:"Yes, I do."},
                    {pl:"Nie, nie mam.", en:"No, I don't."},
                    {pl:"Czy zabierasz ładowarkę?", en:"Do you take a charger?"},
                    {pl:"Czy zabierasz ręcznik?", en:"Do you take a towel?"},
                    {pl:"Czy masz szczoteczkę do zębów?", en:"Do you have a toothbrush?"},
                    {pl:"Czy masz pastę do zębów?", en:"Do you have toothpaste?"},
                    {pl:"Czy zabierasz krem z filtrem?", en:"Do you take sunscreen?"},
                    {pl:"Czy masz pieniądze?", en:"Do you have money?"},
                    {pl:"Czy zabierasz japonki?", en:"Do you take flip-flops?"},
                    {pl:"Czy masz kartę pamięci?", en:"Do you have a memory card?"},
                    {pl:"Czy zabierasz kurtkę przeciwdeszczową?", en:"Do you take a raincoat?"},
                    {pl:"Czy masz przewodnik?", en:"Do you have a guidebook?"},
                    {pl:"Czy zabierasz strój kąpielowy?", en:"Do you take a swimsuit?"},
                    {pl:"Czy zabierasz kąpielówki?", en:"Do you take swimming trunks?"},

                    {pl:"Która godzina?", en:"What's the time?"},
                    {pl:"Jest czwarta.", en:"It's four o'clock."},
                    {pl:"Jest dziesięć po piątej.", en:"It's ten past five."},
                    {pl:"Jest kwadrans po drugiej.", en:"It's quarter past two."},
                    {pl:"Jest wpół do drugiej.", en:"It's half past one."},
                    {pl:"Jest za kwadrans dziesiąta.", en:"It's quarter to ten."},
                    {pl:"Jest za pięć szósta.", en:"It's five to six."},

                    {pl:"Czy masz ładowarkę? Tak, mam.", en:"Do you have a charger? Yes, I do."},
                    {pl:"Czy zabierasz ręcznik? Nie, nie zabieram.", en:"Do you take a towel? No, I don't."},
                    {pl:"Czy masz pieniądze? Tak, mam.", en:"Do you have money? Yes, I do."},
                    {pl:"Czy zabierasz krem z filtrem? Tak, zabieram.", en:"Do you take sunscreen? Yes, I do."},
                    {pl:"Która godzina? Jest czwarta.", en:"What's the time? It's four o'clock."}
                ]
            }
        };
        Object.keys(lessonDatabase).forEach(id => {
            const lesson = lessonDatabase[id];
            // Lekcja 1 ma własny materiał: słowa, zdania, godziny i mini-dialogi.
            // Dzięki temu lekcja zachowuje się jak osobny materiał, a dopiero potem wybieramy tryb ćwiczenia.
            lesson.words = lesson.items.slice(0, 25);
            lesson.sentences = lesson.items.slice(25, 40);
            lesson.time = lesson.items.slice(40, 47);
            lesson.dialogues = lesson.items.slice(47);
            lesson.mix = lesson.items.slice();
            lesson.wordsStages = sliceIntoStages(lesson.words, 10);
            lesson.sentencesStages = sliceIntoStages([...lesson.sentences, ...lesson.dialogues], 10);
            lesson.timeStages = sliceIntoStages(lesson.time, 8);
            lesson.practiceStages = sliceIntoStages([...lesson.sentences, ...lesson.time, ...lesson.dialogues], 10);
            lesson.testStages = sliceIntoStages(lesson.mix, 10);
        });

        function isLessonMaterial() {
            return currentMaterial === 'lesson';
        }

        function getLessonStageMap(category) {
            const lesson = lessonDatabase[currentLesson] || lessonDatabase[1];
            if (category === 'slowa') return lesson.wordsStages;
            if (category === 'zdania') return lesson.sentencesStages;
            if (category === 'liczby') return lesson.timeStages;
            if (category === 'sprint') return lesson.testStages;
            if (category === 'powiedz' && activeSpeechMode === 'slowa') return lesson.wordsStages;
            // Uzupełnij / Napisz / Powiedz-zdania ćwiczą zdania, godziny i dialogi z lekcji.
            return lesson.practiceStages;
        }

        function getCurrentMaterialLabel() {
            if (isLessonMaterial()) return `Lekcja ${currentLesson} — ${lessonDatabase[currentLesson].title}`;
            return ({1: '🌱 Uczę się', 2: '🚶 Próbuję', 3: '🗣️ Rozmawiam'}[currentLevel] || 'Materiał');
        }

        function getMaxStagesForCategory(category) {
            if (category === 'daily' || category === 'trudne') return 1;
            if (isLessonMaterial()) {
                const source = getLessonStageMap(category);
                return Object.keys(source || {}).length || 1;
            }
            if (category === 'liczby') return Object.keys(numbersDatabase[currentLevel] || {}).length || 1;
            const levelDb = database[currentLevel] || database[1];
            const source = category === 'slowa' ? levelDb.words : levelDb.sentences;
            return Object.keys(source || {}).length || 1;
        }

        let currentLevel = 1;
        let currentLesson = 1;
        let currentMaterial = 'level';
        let currentStage = 1;
        let mistakesThisStage = 0;
        let questionsQueue = [];
        let currentStageTotalQuestions = 0;
        let currentWord = {};
        let clozeSteps = [];
        let clozeCurrentSentence = "";
        let clozeOriginalSentence = "";
        let player1Name = localStorage.getItem("quiz_p1_name") || "Użytkownik 1";
        let player2Name = localStorage.getItem("quiz_p2_name") || "Użytkownik 2";
        const currentLanguage = "en";
        let scores = {};
        let currentPlayer = "";
        let activeMode = "";
        let activeCategory = "";
        let activeSpeechMode = "zdania";
        let speechHintTimer1 = null;
        let speechHintTimer2 = null;
        let sprintTimer = null;
        let timeLeft = 60;
        let sprintScore = 0;
        let recognition = null;
        let speechMicButton = null;
        let speechEngineStarted = false;
        let speechProcessing = false;
        let lastSpeechText = "";
        let pendingSpeechText = "";
        let speechFinishTimer = null;
        let stageStats = {};
        let lastStageReward = null;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.maxAlternatives = 3;

            recognition.onresult = event => {
                if (activeCategory !== 'powiedz' || speechProcessing) return;

                let interimText = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        pendingSpeechText = `${pendingSpeechText} ${transcript}`.trim();
                    } else {
                        interimText += transcript;
                    }
                }

                const visibleText = (pendingSpeechText || interimText || "").trim();
                if (visibleText) {
                    clearSpeechHints();
                    document.getElementById("speech-preview").innerText = `Słyszę: "${visibleText}"`;
                }

                // Nie zaliczamy od razu pierwszego fragmentu. Czekamy chwilę po ostatnim słowie,
                // żeby krótkie zdania i dłuższe zdania nie były ucinane.
                if (pendingSpeechText) {
                    if (speechFinishTimer) clearTimeout(speechFinishTimer);
                    speechFinishTimer = setTimeout(() => {
                        const speechResult = pendingSpeechText.trim();
                        if (!speechResult || speechProcessing) return;
                        lastSpeechText = speechResult;
                        document.getElementById("speech-preview").innerText = `Powiedziałeś: "${speechResult}"`;
                        pendingSpeechText = "";
                        speechProcessing = true;
                        verifySpeech(speechResult, speechMicButton);
                    }, 1800);
                }
            };

            recognition.onerror = event => {
                speechEngineStarted = false;
                speechProcessing = false;
                if (speechMicButton) {
                    speechMicButton.classList.remove("mic-listening");
                    speechMicButton.disabled = false;
                    speechMicButton.innerText = event.error === 'not-allowed'
                        ? "Brak zgody mikrofonu w Chrome 🎤"
                        : "Błąd mikrofonu. Kliknij ponownie 🎤";
                }
            };

            recognition.onend = () => {
                // Chrome potrafi sam zakończyć rozpoznawanie po ciszy.
                // Restartujemy tylko, gdy nadal jesteśmy w trybie Powiedz i nie trwa ocenianie odpowiedzi.
                if (activeCategory === 'powiedz' && speechEngineStarted && !speechProcessing) {
                    try { recognition.start(); } catch (e) {}
                }
            };
        }

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playSound(isCorrect) {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            if (isCorrect) {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.12);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.25);
            } else {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            }
        }
        function setLanguage(lang) {
            // Quiz jest teraz tylko po angielsku. Funkcja zostaje jako bezpieczny zapas.
            updateLoginScreenButtons();
        }

        function sanitizePlayerName(value, fallback) {
            const clean = (value || "").trim().replace(/\s+/g, " ");
            return clean || fallback;
        }


        function profileKey(name) {
            return "quizProfile_" + sanitizePlayerName(name, "Uzytkownik").toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
        }

        function defaultProfile(name) {
            return {
                name: sanitizePlayerName(name, "Użytkownik"),
                xp: 0,
                streak: 0,
                lastStudyDate: "",
                completedStages: 0,
                badges: [],
                difficultWords: [],
                dailyDoneDate: ""
            };
        }

        function loadProfile(name) {
            const cleanName = sanitizePlayerName(name, "Użytkownik");
            try {
                const raw = localStorage.getItem(profileKey(cleanName));
                if (!raw) return defaultProfile(cleanName);
                const profile = Object.assign(defaultProfile(cleanName), JSON.parse(raw));
                profile.name = cleanName;
                profile.badges = Array.isArray(profile.badges) ? profile.badges : [];
                profile.difficultWords = Array.isArray(profile.difficultWords) ? profile.difficultWords : [];
                return profile;
            } catch (e) {
                return defaultProfile(cleanName);
            }
        }

        function saveProfile(profile) {
            const cleanName = sanitizePlayerName(profile.name, "Użytkownik");
            profile.name = cleanName;
            localStorage.setItem(profileKey(cleanName), JSON.stringify(profile));
        }

        function getTodayKey() {
            const d = new Date();
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            return `${y}-${m}-${day}`;
        }

        function daysBetween(dateA, dateB) {
            if (!dateA || !dateB) return 999;
            const a = new Date(dateA + "T00:00:00");
            const b = new Date(dateB + "T00:00:00");
            return Math.round((b - a) / 86400000);
        }

        function updateStreak(profile) {
            const today = getTodayKey();
            if (profile.lastStudyDate === today) return;
            const diff = daysBetween(profile.lastStudyDate, today);
            profile.streak = diff === 1 ? (profile.streak || 0) + 1 : 1;
            profile.lastStudyDate = today;
        }

        const xpThresholds = [0, 100, 250, 500, 900, 1400, 2100, 3000, 4200, 5600, 7400, 9600];

        function getLevelInfo(xp) {
            let level = 1;
            for (let i = 0; i < xpThresholds.length; i++) {
                if (xp >= xpThresholds[i]) level = i + 1;
            }
            const current = xpThresholds[level - 1] || 0;
            const next = xpThresholds[level] || (current + 2500);
            const pct = Math.round(((xp - current) / Math.max(1, next - current)) * 100);
            return { level, current, next, pct: Math.max(0, Math.min(100, pct)) };
        }

        function getXpPerCorrect() {
            const base = { slowa: 5, zdania: 10, uzupelnij: 12, napisz: 15, powiedz: 20, liczby: 8, daily: 12, trudne: 14 }[activeCategory] || 8;
            const multiplier = isLessonMaterial() ? 1.15 : ({ 1: 1, 2: 1.2, 3: 1.5 }[currentLevel] || 1);
            return Math.round(base * multiplier);
        }

        const badgeNames = {
            first_stage: "🎒 Pierwszy krok",
            three_days: "🔥 3 dni nauki",
            speaker: "🗣️ Odważny mówca",
            writer: "✍️ Piszę sam",
            numbers: "🔢 Liczby ogarnięte",
            tourist: "✈️ Turysta w podróży",
            lesson1: "🎒 Gotowy na wakacje",
            thousand_xp: "🏆 1000 XP",
            daily: "🎯 Dzisiejszy cel",
            hard_words: "💪 Pogromca trudnych słów"
        };

        function addBadge(profile, badgeId, newBadges) {
            if (!profile.badges.includes(badgeId)) {
                profile.badges.push(badgeId);
                newBadges.push(badgeId);
            }
        }

        function evaluateBadges(profile, category, newBadges) {
            if (profile.completedStages >= 1) addBadge(profile, "first_stage", newBadges);
            if (profile.streak >= 3) addBadge(profile, "three_days", newBadges);
            if (category === "powiedz") addBadge(profile, "speaker", newBadges);
            if (category === "napisz") addBadge(profile, "writer", newBadges);
            if (category === "liczby") addBadge(profile, "numbers", newBadges);
            if ((currentLevel === 1 || isLessonMaterial()) && ["slowa", "zdania", "uzupelnij", "powiedz"].includes(category)) addBadge(profile, "tourist", newBadges);
            if (isLessonMaterial() && currentLesson === 1) addBadge(profile, "lesson1", newBadges);
            if (profile.xp >= 1000) addBadge(profile, "thousand_xp", newBadges);
            if (category === "daily") addBadge(profile, "daily", newBadges);
            if (category === "trudne") addBadge(profile, "hard_words", newBadges);
        }



        function difficultItemKey(item) {
            return normalizeSpeechText(`${item && item.pl ? item.pl : ""}|${item && item.en ? item.en : ""}`);
        }

        function addDifficultWordForPlayer(player, item = currentWord) {
            if (!player || !item || !item.pl || !item.en || activeCategory === 'sprint') return;
            const profile = loadProfile(player);
            const key = difficultItemKey(item);
            if (!key) return;
            profile.difficultWords = Array.isArray(profile.difficultWords) ? profile.difficultWords : [];
            const found = profile.difficultWords.find(x => x.key === key);
            if (found) {
                found.mistakes = (found.mistakes || 1) + 1;
                found.last = getTodayKey();
            } else {
                profile.difficultWords.push({ key, pl: item.pl, en: item.en, mistakes: 1, last: getTodayKey() });
            }
            profile.difficultWords = profile.difficultWords
                .sort((a,b) => (b.mistakes || 0) - (a.mistakes || 0))
                .slice(0, 40);
            saveProfile(profile);
        }

        function reduceDifficultWordForPlayer(player, item = currentWord) {
            if (!player || !item || !item.pl || !item.en) return;
            const profile = loadProfile(player);
            profile.difficultWords = Array.isArray(profile.difficultWords) ? profile.difficultWords : [];
            const key = difficultItemKey(item);
            const found = profile.difficultWords.find(x => x.key === key);
            if (!found) return;
            found.mistakes = Math.max(0, (found.mistakes || 1) - 1);
            if (found.mistakes <= 0 || activeCategory === 'trudne') {
                profile.difficultWords = profile.difficultWords.filter(x => x.key !== key);
            }
            saveProfile(profile);
        }

        function getActivePlayers() {
            return activeMode === 'Obiektyw' ? [player1Name, player2Name] : [activeMode];
        }

        function resetStageStats() {
            stageStats = {};
            stageStats[player1Name] = { correct: 0, wrong: 0 };
            stageStats[player2Name] = { correct: 0, wrong: 0 };
        }

        function recordCorrectAnswer(player) {
            scores[player] = (scores[player] || 0) + 1;
            if (!stageStats[player]) stageStats[player] = { correct: 0, wrong: 0 };
            stageStats[player].correct++;
            reduceDifficultWordForPlayer(player, currentWord);
        }

        function recordWrongAnswer(player) {
            mistakesThisStage++;
            if (!stageStats[player]) stageStats[player] = { correct: 0, wrong: 0 };
            stageStats[player].wrong++;
            addDifficultWordForPlayer(player, currentWord);
        }

        function applyStageRewards(stageWasCompleted) {
            const rewardRows = [];
            const xpPerCorrect = getXpPerCorrect();
            const participants = activeMode === 'Obiektyw' ? [player1Name, player2Name] : [activeMode];
            participants.forEach(player => {
                const stats = stageStats[player] || { correct: 0, wrong: 0 };
                if (stats.correct <= 0 && !stageWasCompleted) return;
                const profile = loadProfile(player);
                const before = getLevelInfo(profile.xp).level;
                let earned = stats.correct * xpPerCorrect;
                if (stageWasCompleted && stats.correct > 0) earned += 10;
                if (stageWasCompleted && mistakesThisStage === 0 && stats.correct > 0) earned += 15;
                if (earned <= 0) return;
                profile.xp += earned;
                profile.completedStages = (profile.completedStages || 0) + 1;
                updateStreak(profile);
                const newBadges = [];
                evaluateBadges(profile, activeCategory, newBadges);
                const after = getLevelInfo(profile.xp).level;
                saveProfile(profile);
                rewardRows.push({ player, earned, profile, levelUp: after > before, newBadges, correct: stats.correct, wrong: stats.wrong });
            });
            lastStageReward = rewardRows;
            renderProfilesSummary();
            return rewardRows;
        }

        function buildRewardHtml(rewards) {
            if (!rewards || rewards.length === 0) return "";
            const lines = rewards.map(r => {
                const info = getLevelInfo(r.profile.xp);
                const badges = r.newBadges.length
                    ? `<div class="badge-list">${r.newBadges.map(b => `<span class="badge-pill">${badgeNames[b] || b}</span>`).join("")}</div>`
                    : "";
                const levelUp = r.levelUp ? " 🌟 Awans!" : "";
                return `<div class="reward-line"><span><strong>${r.player}</strong><br><small>${r.correct} dobrych odpowiedzi${badges}</small></span><span><strong>+${r.earned} XP</strong><br><small>Poziom ${info.level}${levelUp}</small></span></div>`;
            }).join("");
            return `<div class="reward-summary"><strong>🎁 Nagroda za etap</strong>${lines}</div>`;
        }

        function getKnownProfiles() {
            const profiles = [];
            const seen = new Set();
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || !key.startsWith("quizProfile_")) continue;
                try {
                    const p = JSON.parse(localStorage.getItem(key));
                    if (p && p.name && !seen.has(p.name)) {
                        seen.add(p.name);
                        profiles.push(Object.assign(defaultProfile(p.name), p));
                    }
                } catch (e) {}
            }
            [player1Name, player2Name].forEach(name => {
                const p = loadProfile(name);
                if (!seen.has(p.name)) {
                    seen.add(p.name);
                    profiles.push(p);
                }
            });
            return profiles.sort((a,b) => (b.xp || 0) - (a.xp || 0));
        }

        function profileMiniCard(name) {
            const p = loadProfile(name);
            const info = getLevelInfo(p.xp || 0);
            return `<div class="profile-pill"><div class="profile-name">${p.name}</div><div class="profile-meta"><span>⭐ Poziom ${info.level}</span><span>${p.xp || 0} XP</span><span>🔥 ${p.streak || 0}</span><span>🏅 ${p.badges.length}</span></div><div class="xp-mini-track"><div class="xp-mini-fill" style="width:${info.pct}%"></div></div></div>`;
        }

        function renderProfilesSummary() {
            const box = document.getElementById("profiles-summary");
            if (!box) return;
            const p1Input = document.getElementById("player1-input");
            const p2Input = document.getElementById("player2-input");
            const p1 = sanitizePlayerName(p1Input ? p1Input.value : player1Name, "Użytkownik 1");
            const p2 = sanitizePlayerName(p2Input ? p2Input.value : player2Name, "Użytkownik 2");
            const ranking = getKnownProfiles().slice(0, 3);
            const rankingText = ranking.length
                ? ranking.map((p, i) => `${i + 1}. ${p.name} — ${p.xp || 0} XP`).join(" • ")
                : "Brak wyników — ukończ pierwszy etap";
            box.innerHTML = `<div class="profiles-grid">${profileMiniCard(p1)}${profileMiniCard(p2)}</div><div class="ranking-box">🏆 Ranking lokalny: ${rankingText}</div>`;
        }

        function readAndSavePlayerNames() {
            const p1Input = document.getElementById("player1-input");
            const p2Input = document.getElementById("player2-input");

            player1Name = sanitizePlayerName(p1Input ? p1Input.value : player1Name, "Użytkownik 1");
            player2Name = sanitizePlayerName(p2Input ? p2Input.value : player2Name, "Użytkownik 2");

            localStorage.setItem("quiz_p1_name", player1Name);
            localStorage.setItem("quiz_p2_name", player2Name);

            if (p1Input) p1Input.value = player1Name;
            if (p2Input) p2Input.value = player2Name;
            renderProfilesSummary();
        }

        function updateLoginScreenButtons() {
            const p1Input = document.getElementById("player1-input");
            const p2Input = document.getElementById("player2-input");

            if (p1Input && document.activeElement !== p1Input) p1Input.value = player1Name;
            if (p2Input && document.activeElement !== p2Input) p2Input.value = player2Name;

            const p1Preview = sanitizePlayerName(p1Input ? p1Input.value : player1Name, "Użytkownik 1");
            const p2Preview = sanitizePlayerName(p2Input ? p2Input.value : player2Name, "Użytkownik 2");

            document.getElementById("p1-login-btn").innerText = `👤 Graj jako ${p1Preview}`;
            document.getElementById("p2-login-btn").innerText = `👤 Graj jako ${p2Preview}`;
            document.getElementById("shared-login-btn").innerText = `👥 Graj razem: ${p1Preview} i ${p2Preview}`;
            renderProfilesSummary();
        }

        function handleLoginSelect(type) {
            readAndSavePlayerNames();
            updateLoginScreenButtons();
            if (type === 1) login(player1Name);
            else if (type === 2) login(player2Name);
            else login('Obiektyw');
        }

        function login(mode) {
            activeMode = mode;
            document.getElementById("login-screen").style.display = "none";
            document.getElementById("level-screen").style.display = "block";
            const welcomeText = activeMode === 'Obiektyw'
                ? `Cześć ${player1Name} i ${player2Name}!`
                : `Cześć ${activeMode}!`;
            document.getElementById("level-welcome-msg").innerText = welcomeText + " Wybierz materiał:";
        }

        function selectLevel(lvl) {
            currentMaterial = 'level';
            currentLevel = lvl;
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("category-screen").style.display = "block";
            const lvlNames = {1: "🌱 Uczę się", 2: "🚶 Próbuję", 3: "🗣️ Rozmawiam"};
            document.getElementById("cat-welcome-msg").innerText = `${lvlNames[lvl]} — wybierz ćwiczenie:`;
            document.getElementById("sprint-nav-btn").style.display = activeMode === 'Obiektyw' ? "none" : "block";
        }

        function openLessons() {
            stopSpeechEngine();
            currentMaterial = 'lesson';
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("category-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "block";
        }

        function selectLesson(lessonId) {
            currentMaterial = 'lesson';
            currentLesson = lessonId;
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("category-screen").style.display = "block";
            document.getElementById("cat-welcome-msg").innerText = `📚 Lekcja ${lessonId}: ${lessonDatabase[lessonId].title} — wybierz ćwiczenie:`;
            document.getElementById("sprint-nav-btn").style.display = "none";
        }

        function getProgressSaveKey() {
            const materialKey = isLessonMaterial() ? `Lesson${currentLesson}` : `Level${currentLevel}`;
            const playerKey = activeMode === player1Name || activeMode === player2Name
                ? activeMode
                : `${player1Name}_${player2Name}`;
            const catKey = activeCategory === 'powiedz' ? `${activeCategory}_${activeSpeechMode}` : activeCategory;
            return `quizStage_${playerKey}_${materialKey}_${catKey}_EN`;
        }


        function openSpeechChoice() {
            stopSpeechEngine();
            document.getElementById("category-screen").style.display = "none";
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("speech-choice-screen").style.display = "block";
            const materialLabel = getCurrentMaterialLabel();
            document.getElementById("speech-choice-title").innerText = `🗣 ${materialLabel} — Powiedz`;
        }

        function selectSpeechMode(mode) {
            activeSpeechMode = mode;
            document.getElementById("speech-choice-screen").style.display = "none";
            selectCategory('powiedz', true);
        }

        function selectCategory(category, fromSpeechChoice = false) {
            if (category === 'powiedz' && !fromSpeechChoice) {
                openSpeechChoice();
                return;
            }
            if (activeCategory === 'powiedz' && category !== 'powiedz') stopSpeechEngine();
            if (sprintTimer) {
                clearInterval(sprintTimer);
                sprintTimer = null;
            }
            activeCategory = category;
            document.getElementById("category-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("game-screen").style.display = "block";
            scores[player1Name] = 0;
            scores[player2Name] = 0;
            resetStageStats();
            sprintScore = 0;
            timeLeft = 60;
            document.getElementById("context-title").innerText = "";
            document.getElementById("main-question-text").innerText = "";
            document.getElementById("speech-mode-row").style.display = "none";
            document.getElementById("speech-preview").innerText = "";
            document.getElementById("options-container").style.display = "none";
            document.getElementById("stage-btn").style.display = "block";

            const maxStages = getMaxStagesForCategory(activeCategory);

            if (activeCategory === 'sprint') {
                currentPlayer = activeMode;
                document.getElementById("stage-display").style.display = "none";
                document.getElementById("progress-display").style.display = "none";
                document.getElementById("stage-progress-card").style.display = "none";
                document.getElementById("timer-display").style.display = "block";
                document.getElementById("timer-display").innerText = `⏱ 60s`;
                document.getElementById("turn-indicator").style.display = "none";
                document.getElementById("score-agata").style.display = activeMode === player1Name ? "block" : "none";
                document.getElementById("score-darek").style.display = activeMode === player2Name ? "block" : "none";
                document.getElementById("main-question-text").innerHTML = `🚀 SPRINT (Poziom ${currentLevel})!<br><br><span style='font-size:16px; font-weight:400; color:#475569;'>Dobra odpowiedź: +3s. Błąd: -5s.</span>`;
                document.getElementById("stage-btn").innerText = "START 💣";
            } else {
                const saveKey = getProgressSaveKey();
                const savedStage = localStorage.getItem(saveKey);
                currentStage = savedStage ? parseInt(savedStage, 10) : 1;
                if (currentStage > maxStages) currentStage = maxStages;
                document.getElementById("stage-display").style.display = "block";
                document.getElementById("progress-display").style.display = "block";
                document.getElementById("stage-progress-card").style.display = "block";
                document.getElementById("timer-display").style.display = "none";
                setupUI();
                const modeName = activeCategory === 'daily' ? 'Dzisiejszy trening'
                    : activeCategory === 'trudne' ? 'Trudne słowa'
                    : activeCategory === 'slowa' ? 'Słowa'
                    : activeCategory === 'zdania' ? 'Zdania'
                    : activeCategory === 'uzupelnij' ? 'Uzupełnij'
                    : activeCategory === 'napisz' ? 'Napisz'
                    : activeCategory === 'liczby' ? (isLessonMaterial() ? 'Godziny' : 'Liczby')
                    : activeCategory === 'sprint' ? 'Sprint' : `Powiedz — ${activeSpeechMode === 'slowa' ? 'słowa' : 'zdania'}`;
                const materialTitle = isLessonMaterial() ? `📚 Lekcja ${currentLesson} — ${lessonDatabase[currentLesson].title}` : getCurrentMaterialLabel();
                document.getElementById("main-question-text").innerText = `${materialTitle}
${modeName} - Etap ${currentStage} / ${maxStages}`;
                document.getElementById("stage-btn").innerText = "Zacznij Etap ➔";
            }
            updateUI();
        }

        function setupUI() {
            if (activeMode === 'Obiektyw') {
                currentPlayer = player1Name;
                document.getElementById("score-agata").style.display = "block";
                document.getElementById("score-darek").style.display = "block";
                document.getElementById("turn-indicator").style.display = "block";
            } else {
                currentPlayer = activeMode;
                document.getElementById("score-agata").style.display = activeMode === player1Name ? "block" : "none";
                document.getElementById("score-darek").style.display = activeMode === player2Name ? "block" : "none";
                document.getElementById("turn-indicator").style.display = "none";
            }
        }

        function speak(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.85;
                window.speechSynthesis.speak(utterance);
            }
        }

        function speakCurrentWord() {
            if (currentWord && currentWord[currentLanguage]) {
                speak(currentWord[currentLanguage]);
            }
        }



        function flattenStageMap(stageMap) {
            let all = [];
            Object.keys(stageMap || {}).forEach(k => { all = all.concat(stageMap[k]); });
            return all.filter(x => x && x.pl && x.en);
        }

        function uniqueItems(items) {
            const seen = new Set();
            return items.filter(item => {
                const k = difficultItemKey(item);
                if (!k || seen.has(k)) return false;
                seen.add(k);
                return true;
            });
        }

        function sampleItems(items, count) {
            return uniqueItems([...items]).sort(() => Math.random() - 0.5).slice(0, count);
        }

        function buildDailyTrainingPool() {
            let words = [];
            let sentences = [];
            let numbers = [];
            if (isLessonMaterial()) {
                const lesson = lessonDatabase[currentLesson] || lessonDatabase[1];
                words = flattenStageMap(lesson.wordsStages);
                sentences = flattenStageMap(lesson.practiceStages);
                numbers = flattenStageMap(lesson.timeStages);
            } else {
                const lvlDB = database[currentLevel] || database[1];
                words = flattenStageMap(lvlDB.words);
                sentences = flattenStageMap(lvlDB.sentences);
                numbers = flattenStageMap(numbersDatabase[currentLevel] || numbersDatabase[1]);
            }
            const difficult = getActivePlayers()
                .flatMap(p => (loadProfile(p).difficultWords || []))
                .map(x => ({pl: x.pl, en: x.en}))
                .filter(x => x.pl && x.en);
            const pool = [
                ...sampleItems(words, 6),
                ...sampleItems(sentences, 6),
                ...sampleItems(numbers, 2),
                ...sampleItems(difficult, 4)
            ];
            return uniqueItems(pool).sort(() => Math.random() - 0.5).slice(0, 16);
        }

        function buildDifficultWordsPool() {
            const difficult = getActivePlayers()
                .flatMap(p => (loadProfile(p).difficultWords || []))
                .sort((a,b) => (b.mistakes || 0) - (a.mistakes || 0))
                .map(x => ({pl: x.pl, en: x.en}))
                .filter(x => x.pl && x.en);
            let pool = uniqueItems(difficult).slice(0, 20);
            if (pool.length < 6) {
                const fallback = isLessonMaterial()
                    ? flattenStageMap(getLessonStageMap('slowa'))
                    : flattenStageMap((database[currentLevel] || database[1]).words);
                pool = uniqueItems([...pool, ...sampleItems(fallback, 10)]);
            }
            return pool.sort(() => Math.random() - 0.5);
        }

        function startStage() {
            document.getElementById("stage-btn").style.display = "none";
            document.getElementById("options-container").style.display = "grid";
            mistakesThisStage = 0;
            resetStageStats();
            if (activeCategory === 'sprint') {
                generateSprintPool();
                startSprintTimer();
            } else if (activeCategory === 'daily') {
                questionsQueue = buildDailyTrainingPool();
            } else if (activeCategory === 'trudne') {
                questionsQueue = buildDifficultWordsPool();
            } else if (isLessonMaterial()) {
                const dbObj = getLessonStageMap(activeCategory);
                let pool = dbObj[currentStage] ? [...dbObj[currentStage]] : [...dbObj[1]];
                for (let i = 1; i < currentStage; i++) {
                    if (dbObj[i]) {
                        const prev = [...dbObj[i]].sort(() => Math.random() - 0.5);
                        pool = pool.concat(prev.slice(0, 4));
                    }
                }
                questionsQueue = pool.sort(() => Math.random() - 0.5);
            } else if (activeCategory === 'liczby') {
                const dbObj = numbersDatabase[currentLevel];
                let pool = dbObj[currentStage] ? [...dbObj[currentStage]] : [...dbObj[1]];
                for (let i = 1; i < currentStage; i++) {
                    if (dbObj[i]) {
                        const prev = [...dbObj[i]].sort(() => Math.random() - 0.5);
                        pool = pool.concat(prev.slice(0, 5));
                    }
                }
                questionsQueue = pool.sort(() => Math.random() - 0.5);
            } else {
                let dbObj;
                if (activeCategory === 'slowa') {
                    dbObj = database[currentLevel].words;
                } else if (activeCategory === 'powiedz' && activeSpeechMode === 'slowa') {
                    dbObj = database[currentLevel].words;
                } else {
                    dbObj = database[currentLevel].sentences;
                }
                let pool = dbObj[currentStage] ? [...dbObj[currentStage]] : [...dbObj[1]];
                for (let i = 1; i < currentStage; i++) {
                    if (dbObj[i]) {
                        const prev = [...dbObj[i]].sort(() => Math.random() - 0.5);
                        const repeatCount = (activeCategory === 'slowa' || activeSpeechMode === 'slowa') ? 8 : 6;
                        pool = pool.concat(prev.slice(0, repeatCount));
                    }
                }
                questionsQueue = pool.sort(() => Math.random() - 0.5);
            }
            if (activeCategory !== 'sprint') {
                currentStageTotalQuestions = questionsQueue.length;
            }
            loadNextQuestion();
        }

        function generateSprintPool() {
            let all = [];
            const lvlDB = database[currentLevel];
            const numDB = numbersDatabase[currentLevel];
            for (const s in lvlDB.words) all = all.concat(lvlDB.words[s]);
            for (const s in lvlDB.sentences) all = all.concat(lvlDB.sentences[s].filter(item => item && item.pl && item[currentLanguage]));
            for (const s in numDB) all = all.concat(numDB[s]);
            questionsQueue = all.sort(() => Math.random() - 0.5);
        }

        function startSprintTimer() {
            if (sprintTimer) clearInterval(sprintTimer);
            document.getElementById("timer-display").innerText = `⏱ ${timeLeft}s`;
            sprintTimer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer-display").innerText = `⏱ ${timeLeft}s`;
                if (timeLeft <= 0) endSprintGame();
            }, 1000);
        }


        function requeueForPractice(item = currentWord) {
            if (!item) return;
            const insertAt = Math.min(3, Math.max(0, questionsQueue.length));
            questionsQueue.splice(insertAt, 0, item);
        }

        function loadNextQuestion() {
            if (questionsQueue.length === 0 && activeCategory !== 'sprint') { endStage(); return; }
            if (questionsQueue.length === 0 && activeCategory === 'sprint') { generateSprintPool(); }
            currentWord = questionsQueue.shift();
            if (!currentWord || !currentWord.pl || !currentWord[currentLanguage]) {
                loadNextQuestion();
                return;
            }
            const optionsContainer = document.getElementById("options-container");
            optionsContainer.innerHTML = "";
            document.getElementById("context-title").innerText = "";
            document.getElementById("main-question-text").innerText = "";
            document.getElementById("speech-mode-row").style.display = "none";
            document.getElementById("speech-preview").innerText = "";

            if (activeCategory === 'uzupelnij') {
                prepareClozeTest();
            } else if (activeCategory === 'napisz') {
                prepareWriteTest();
            } else if (activeCategory === 'powiedz') {
                prepareSpeechTest();
            } else {
                document.getElementById("main-question-text").innerText = currentWord.pl;
                prepareStandardOptions();
            }
            updateUI();
        }

        function prepareClozeTest() {
            const targetSentence = currentWord[currentLanguage];
            const wordsArray = targetSentence.split(" ");
            const validIndexes = [];
            for (let i = 0; i < wordsArray.length; i++) {
                const clean = wordsArray[i].replace(/[?!.¿¡,]/g, "");
                if (clean.length > 3) validIndexes.push({idx:i, clean});
            }
            validIndexes.sort(() => Math.random() - 0.5);
            const blanksCount = (wordsArray.length >= 6 && validIndexes.length >= 2) ? 2 : 1;
            if (validIndexes.length === 0) {
                clozeSteps = [targetSentence];
                clozeCurrentSentence = "____";
                clozeOriginalSentence = targetSentence;
            } else {
                const selected = validIndexes.slice(0, blanksCount).sort((a,b)=>a.idx-b.idx);
                clozeSteps = selected.map(s => s.clean);
                clozeOriginalSentence = targetSentence;
                clozeCurrentSentence = targetSentence;
                selected.forEach(s => { clozeCurrentSentence = clozeCurrentSentence.replace(s.clean, "____"); });
            }
            document.getElementById("context-title").innerText = currentWord.pl;
            renderClozeStep();
        }

        function renderClozeStep() {
            document.getElementById("main-question-text").innerText = clozeCurrentSentence;
            const optionsContainer = document.getElementById("options-container");
            optionsContainer.innerHTML = "";
            const currentTarget = clozeSteps[0];
            const options = [currentTarget];
            const allWords = [];
            const sourceMap = isLessonMaterial() ? getLessonStageMap(activeCategory) : (database[currentLevel] || database[1]).sentences;
            for (const s in sourceMap) {
                sourceMap[s].forEach(item => {
                    if (item && item[currentLanguage]) {
                        item[currentLanguage].split(" ").forEach(word => {
                            const cl = word.replace(/[?!.¿¡,]/g,"");
                            if (cl.length > 3) allWords.push(cl);
                        });
                    }
                });
            }
            let attempts = 0;
            const poolWords = [...new Set(allWords)].filter(w => w !== currentTarget);
            while (options.length < 4 && poolWords.length > 0 && attempts < 100) {
                attempts++;
                const idx = Math.floor(Math.random() * poolWords.length);
                const candidate = poolWords.splice(idx,1)[0];
                if (!options.includes(candidate)) options.push(candidate);
            }
            while (options.length < 4) options.push("____");
            options.sort(() => Math.random() - 0.5);
            options.forEach(o => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.innerText = o;
                btn.className = "btn";
                btn.onclick = () => checkClozeAnswer(btn, o, currentTarget);
                optionsContainer.appendChild(btn);
            });
        }

        function checkClozeAnswer(btn, selected, correct) {
            document.querySelectorAll("#options-container .btn").forEach(b => b.disabled = true);
            if (selected === correct) {
                btn.classList.add("correct");
                clozeSteps.shift();
                clozeCurrentSentence = clozeCurrentSentence.replace("____", correct);
                document.getElementById("main-question-text").innerText = clozeCurrentSentence;
                if (clozeSteps.length > 0) {
                    setTimeout(renderClozeStep, 700);
                } else {
                    recordCorrectAnswer(currentPlayer);
                    playSound(true);
                    speak(currentWord[currentLanguage]);
                    setTimeout(nextTurn, 2200);
                }
            } else {
                btn.classList.add("wrong");
                recordWrongAnswer(currentPlayer);
                requeueForPractice(currentWord);
                document.querySelectorAll("#options-container .btn").forEach(b => {
                    if (b.innerText === correct) b.classList.add("correct");
                });
                document.getElementById("main-question-text").innerHTML = `<span style="color:#ef4444;">${clozeOriginalSentence}</span>`;
                playSound(false);
                setTimeout(nextTurn, 2500);
            }
            updateUI();
        }

        function prepareWriteTest() {
            const targetSentence = currentWord[currentLanguage];
            const wordsArray = targetSentence.split(" ");
            const validIndexes = [];
            for (let i = 0; i < wordsArray.length; i++) {
                const clean = wordsArray[i].replace(/[?!.¿¡,]/g, "");
                if (clean.length > 3) validIndexes.push({idx:i, clean});
            }
            validIndexes.sort(() => Math.random() - 0.5);
            const blanksCount = (wordsArray.length >= 6 && validIndexes.length >= 2) ? 2 : 1;
            if (validIndexes.length === 0) {
                clozeSteps = [targetSentence];
                clozeCurrentSentence = "____";
                clozeOriginalSentence = targetSentence;
            } else {
                const selected = validIndexes.slice(0, blanksCount).sort((a,b)=>a.idx-b.idx);
                clozeSteps = selected.map(s=>s.clean);
                clozeOriginalSentence = targetSentence;
                clozeCurrentSentence = targetSentence;
                selected.forEach(s => { clozeCurrentSentence = clozeCurrentSentence.replace(s.clean, "____"); });
            }
            document.getElementById("context-title").innerText = currentWord.pl;
            document.getElementById("main-question-text").innerText = clozeCurrentSentence;
            const optionsContainer = document.getElementById("options-container");
            optionsContainer.innerHTML = "";
            clozeSteps.forEach((stepWord, index) => {
                const input = document.createElement("input");
                input.type = "text";
                input.className = "write-input";
                input.placeholder = `Wpisz słowo ${index + 1}...`;
                input.autocomplete = "off";
                input.autocorrect = "off";
                input.autocapitalize = "off";
                input.spellcheck = false;
                input.addEventListener("keypress", event => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        const allInputs = document.querySelectorAll(".write-input");
                        const allFilled = Array.from(allInputs).every(i => i.value.trim() !== "");
                        if (allFilled) document.getElementById("check-write-btn").click();
                    }
                });
                optionsContainer.appendChild(input);
            });
            const checkBtn = document.createElement("button");
            checkBtn.type = "button";
            checkBtn.className = "btn";
            checkBtn.id = "check-write-btn";
            checkBtn.innerText = "Sprawdź odpowiedź ✅";
            checkBtn.onclick = () => checkWriteAnswer(clozeSteps);
            optionsContainer.appendChild(checkBtn);
            setTimeout(() => {
                const firstInput = document.querySelector(".write-input");
                if (firstInput) firstInput.focus();
            }, 100);
        }

        function checkWriteAnswer(expectedWords) {
            const inputs = Array.from(document.querySelectorAll(".write-input"));
            const checkBtn = document.getElementById("check-write-btn");
            if (checkBtn) checkBtn.disabled = true;
            inputs.forEach(input => { input.disabled = true; });
            let allCorrect = true;
            inputs.forEach((input, index) => {
                const userVal = input.value.trim().toLowerCase().replace(/[?!.,¿¡]/g, "");
                const expectedVal = expectedWords[index].toLowerCase().replace(/[?!.,¿¡]/g, "");
                if (userVal !== expectedVal) {
                    allCorrect = false;
                    input.classList.add("wrong-input");
                } else {
                    input.classList.add("correct-input");
                }
            });
            if (allCorrect) {
                playSound(true);
                recordCorrectAnswer(currentPlayer);
                speak(currentWord[currentLanguage]);
                let finalSentence = clozeCurrentSentence;
                inputs.forEach((input, index) => {
                    finalSentence = finalSentence.replace("____", `<span style="color:#22c55e">${expectedWords[index]}</span>`);
                });
                document.getElementById("main-question-text").innerHTML = finalSentence;
                setTimeout(nextTurn, 2200);
            } else {
                playSound(false);
                recordWrongAnswer(currentPlayer);
                requeueForPractice(currentWord);
                document.getElementById("main-question-text").innerHTML = `<span style="color:#ef4444;">${clozeOriginalSentence}</span>`;
                const feedback = document.createElement("div");
                feedback.style.marginTop = "14px";
                feedback.style.fontSize = "1rem";
                feedback.innerHTML = `<span style="font-weight:700; color:#ef4444;">Pomyłka!</span> Poprawnie: <span style="color:#22c55e; font-weight:700;">${expectedWords.join(" ... ")}</span>`;
                document.getElementById("options-container").appendChild(feedback);
                setTimeout(nextTurn, 3200);
            }
            updateUI();
        }

        function collectStageMapItems(stageMap) {
            let items = [];
            Object.keys(stageMap || {}).forEach(stage => {
                items = items.concat(stageMap[stage] || []);
            });
            return items.filter(item => item && item.pl && item[currentLanguage]);
        }

        function englishWordCount(text) {
            return String(text || "").trim().split(/\s+/).filter(Boolean).length;
        }

        function looksLikeSentenceItem(item) {
            const text = String((item && item[currentLanguage]) || "").trim();
            return englishWordCount(text) > 2 || /[?.!]/.test(text);
        }

        function inferQuestionType(item) {
            if (activeCategory === 'liczby') return 'number';
            if (activeCategory === 'slowa' || (activeCategory === 'powiedz' && activeSpeechMode === 'slowa')) return 'word';
            if (activeCategory === 'zdania' || activeCategory === 'uzupelnij' || activeCategory === 'napisz' || (activeCategory === 'powiedz' && activeSpeechMode === 'zdania')) return 'sentence';

            const text = String((item && item[currentLanguage]) || "").trim();
            const wc = englishWordCount(text);

            // Tryby mieszane (Dzisiejszy trening / Trudne słowa / Sprint) rozpoznają typ po aktualnym pytaniu.
            if (wc <= 2 && !/[?.!]/.test(text)) return 'word';
            return 'sentence';
        }

        function filterItemsByQuestionType(items, type) {
            return (items || []).filter(item => {
                if (!item || !item[currentLanguage]) return false;
                if (type === 'word') return !looksLikeSentenceItem(item);
                if (type === 'sentence') return looksLikeSentenceItem(item);
                return true;
            });
        }

        function buildDistractorItemsForCurrentQuestion() {
            const type = inferQuestionType(currentWord);
            const lvlDB = database[currentLevel] || database[1];
            const numDB = numbersDatabase[currentLevel] || numbersDatabase[1];
            let pool = [];

            if (isLessonMaterial()) {
                const lesson = lessonDatabase[currentLesson] || lessonDatabase[1];
                if (type === 'word') {
                    pool = collectStageMapItems(lesson.wordsStages);
                } else if (type === 'number') {
                    pool = collectStageMapItems(lesson.timeStages);
                } else {
                    pool = collectStageMapItems(lesson.practiceStages);
                }

                // Awaryjnie dokładamy materiał tego samego typu z poziomu, żeby nie tworzyć oczywistych pustych odpowiedzi.
                if (pool.length < 6) {
                    if (type === 'word') pool = pool.concat(collectStageMapItems(lvlDB.words));
                    else if (type === 'number') pool = pool.concat(collectStageMapItems(numDB));
                    else pool = pool.concat(collectStageMapItems(lvlDB.sentences));
                }
            } else if (type === 'word') {
                pool = collectStageMapItems(lvlDB.words);
                if (activeCategory === 'trudne' || activeCategory === 'daily') {
                    const difficultWords = getActivePlayers()
                        .flatMap(p => (loadProfile(p).difficultWords || []))
                        .map(x => ({pl: x.pl, en: x.en}))
                        .filter(x => x.pl && x.en);
                    pool = difficultWords.concat(pool);
                }
            } else if (type === 'number') {
                pool = collectStageMapItems(numDB);
            } else {
                pool = collectStageMapItems(lvlDB.sentences);
            }

            return filterItemsByQuestionType(pool, type);
        }

        function chooseSmartDistractors(poolTexts, targetText, count = 3) {
            const target = String(targetText || "");
            const targetWordCount = englishWordCount(target);
            const unique = [...new Set((poolTexts || [])
                .map(t => String(t || "").trim())
                .filter(Boolean)
                .filter(t => t !== target))];

            // Najpierw wybieramy odpowiedzi podobnego typu i długości, żeby nie były zbyt oczywiste.
            const ranked = unique
                .map(text => {
                    const wc = englishWordCount(text);
                    const lengthScore = Math.abs(text.length - target.length);
                    const wordsScore = Math.abs(wc - targetWordCount) * 10;
                    return { text, score: lengthScore + wordsScore + Math.random() * 6 };
                })
                .sort((a, b) => a.score - b.score)
                .map(x => x.text);

            return ranked.slice(0, count);
        }

        function prepareStandardOptions() {
            const targetText = currentWord[currentLanguage];
            const pool = buildDistractorItemsForCurrentQuestion();
            const poolTexts = pool.map(item => item && item[currentLanguage]).filter(Boolean);
            const options = [targetText, ...chooseSmartDistractors(poolTexts, targetText, 3)];

            // Ostateczny bezpiecznik: jeśli w małej lekcji brakuje opcji, dokładamy nadal z tego samego typu pytania.
            const type = inferQuestionType(currentWord);
            if (options.length < 4) {
                const fallback = type === 'word'
                    ? collectStageMapItems((database[currentLevel] || database[1]).words)
                    : type === 'number'
                        ? collectStageMapItems(numbersDatabase[currentLevel] || numbersDatabase[1])
                        : collectStageMapItems((database[currentLevel] || database[1]).sentences);
                chooseSmartDistractors(fallback.map(item => item && item[currentLanguage]).filter(Boolean), targetText, 6).forEach(candidate => {
                    if (options.length < 4 && !options.includes(candidate)) options.push(candidate);
                });
            }

            while (options.length < 4) options.push("—");
            renderOptions(options.slice(0, 4), targetText);
        }

        function renderOptions(opts, correct) {
            opts.sort(() => Math.random() - 0.5);
            const container = document.getElementById("options-container");
            container.innerHTML = "";
            opts.forEach(option => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.innerText = option;
                btn.className = "btn";
                btn.onclick = () => checkAnswer(btn, option, correct);
                container.appendChild(btn);
            });
        }

        function prepareSpeechTest() {
            clearSpeechHints();
            document.getElementById("context-title").innerText = currentWord.pl;
            const target = currentWord[currentLanguage];
            const targetEl = document.getElementById("target-language-text");
            const useDelayedHints = shouldUseDelayedSpeechHints();
            targetEl.innerText = useDelayedHints ? "" : target;
            document.getElementById("speech-mode-row").style.display = "flex";
            const optionsContainer = document.getElementById("options-container");
            optionsContainer.innerHTML = "";
            if (!recognition) {
                optionsContainer.innerHTML = "<p style='color:#ef4444; font-weight:700;'>Niestety ta przeglądarka nie obsługuje mikrofonu.</p>";
                return;
            }
            const micBtn = document.createElement("button");
            micBtn.type = "button";
            micBtn.className = "btn mic-btn";
            micBtn.innerText = speechEngineStarted ? "Mikrofon aktywny — powiedz teraz 🎤" : "Naciśnij i powiedz 🎤";
            micBtn.onclick = () => startListening(micBtn);
            speechMicButton = micBtn;
            if (speechEngineStarted) micBtn.classList.add("mic-listening");
            optionsContainer.appendChild(micBtn);
            if (useDelayedHints) {
                document.getElementById("speech-preview").innerText = "Najpierw spróbuj sam. Podpowiedź pojawi się po chwili.";
            }
        }


        function shouldUseDelayedSpeechHints() {
            return activeCategory === 'powiedz'
                && activeSpeechMode === 'zdania'
                && !isLessonMaterial()
                && currentLevel >= 2;
        }

        function clearSpeechHints() {
            if (speechHintTimer1) clearTimeout(speechHintTimer1);
            if (speechHintTimer2) clearTimeout(speechHintTimer2);
            speechHintTimer1 = null;
            speechHintTimer2 = null;
        }

        function scheduleSpeechHints() {
            clearSpeechHints();
            if (!shouldUseDelayedSpeechHints()) return;
            const target = currentWord[currentLanguage];
            speechHintTimer1 = setTimeout(() => {
                if (pendingSpeechText || speechProcessing || activeCategory !== 'powiedz') return;
                document.getElementById("target-language-text").innerText = target;
                document.getElementById("speech-preview").innerText = "Podpowiedź: przeczytaj po angielsku.";
            }, 3000);
            speechHintTimer2 = setTimeout(() => {
                if (pendingSpeechText || speechProcessing || activeCategory !== 'powiedz') return;
                document.getElementById("speech-preview").innerText = "Posłuchaj i powtórz.";
                speak(target);
            }, 6000);
        }

        function startListening(btn) {
            if (!recognition) return;
            speechMicButton = btn;
            recognition.lang = 'en-US';
            btn.innerText = "Słucham... Mów teraz! 📣";
            btn.classList.add("mic-listening");
            btn.disabled = false;
            pendingSpeechText = "";
            if (speechFinishTimer) clearTimeout(speechFinishTimer);
            document.getElementById("speech-preview").innerText = lastSpeechText ? `Ostatnio: "${lastSpeechText}"` : "...";
            scheduleSpeechHints();
            if (!speechEngineStarted) {
                try {
                    recognition.start();
                    speechEngineStarted = true;
                } catch (e) {
                    // Gdy Chrome zgłosi, że rozpoznawanie już działa, zostawiamy aktywny tryb.
                    speechEngineStarted = true;
                }
            }
        }

        function normalizeSpeechText(text) {
            return String(text || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[?!.,;:"'¿¡]/g, "")
                .replace(/\s+/g, " ")
                .trim();
        }

        function levenshteinDistance(a, b) {
            const matrix = Array.from({ length: a.length + 1 }, () => []);
            for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
            for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j - 1] + cost
                    );
                }
            }
            return matrix[a.length][b.length];
        }

        function textSimilarity(a, b) {
            if (!a || !b) return 0;
            if (a === b) return 1;
            const maxLen = Math.max(a.length, b.length);
            return 1 - (levenshteinDistance(a, b) / maxLen);
        }

        function wordMatchRatio(said, correct) {
            const saidWords = said.split(" ").filter(Boolean);
            const correctWords = correct.split(" ").filter(Boolean);
            if (!saidWords.length || !correctWords.length) return 0;
            let matched = 0;
            correctWords.forEach(cw => {
                if (saidWords.some(sw => sw === cw || textSimilarity(sw, cw) >= 0.86)) matched++;
            });
            return matched / correctWords.length;
        }

        function isSpeechAnswerCorrect(said, correct) {
            const cleanSaid = normalizeSpeechText(said);
            const cleanCorrect = normalizeSpeechText(correct);
            if (!cleanSaid || !cleanCorrect) return false;

            const correctWords = cleanCorrect.split(" ").filter(Boolean);
            const similarity = textSimilarity(cleanSaid, cleanCorrect);
            const wordsRatio = wordMatchRatio(cleanSaid, cleanCorrect);

            // Słowa i krótkie frazy oceniamy bardzo surowo.
            if (correctWords.length <= 2) {
                return similarity >= 0.88;
            }

            // Zdania mogą mieć drobną pomyłkę rozpoznawania, ale większość słów musi pasować.
            return similarity >= 0.80 && wordsRatio >= 0.70;
        }

        function verifySpeech(said, micBtn) {
            clearSpeechHints();
            if (!micBtn) return;
            micBtn.classList.remove("mic-listening");
            const correctText = currentWord[currentLanguage];
            const isCorrect = isSpeechAnswerCorrect(said, correctText);
            if (isCorrect) {
                micBtn.classList.add("correct");
                micBtn.innerText = "Dobrze! Zaliczone ✅";
                playSound(true);
                recordCorrectAnswer(currentPlayer);
                speak(correctText);
            } else {
                micBtn.classList.add("wrong");
                micBtn.innerText = `Błąd ❌ Poprawnie: ${correctText}`;
                playSound(false);
                recordWrongAnswer(currentPlayer);
                requeueForPractice(currentWord);
            }
            updateUI();
            setTimeout(() => {
                speechProcessing = false;
                if (activeCategory === 'powiedz' && speechEngineStarted) {
                    try { recognition.start(); } catch (e) {}
                }
                nextTurn();
            }, 2800);
        }

        function checkAnswer(btn, selected, correct) {
            document.querySelectorAll("#options-container .btn").forEach(b => b.disabled = true);
            if (activeCategory === 'sprint') {
                if (selected === correct) {
                    btn.classList.add("correct");
                    sprintScore++;
                    timeLeft += 3;
                    document.getElementById("timer-display").innerText = `⏱ ${timeLeft}s`;
                    playSound(true);
                    speak(currentWord[currentLanguage]);
                    setTimeout(loadNextQuestion, 1000);
                } else {
                    btn.classList.add("wrong");
                    timeLeft -= 5;
                    document.getElementById("timer-display").innerText = `⏱ ${timeLeft}s`;
                    playSound(false);
                    document.querySelectorAll("#options-container .btn").forEach(b => {
                        if (b.innerText === correct) b.classList.add("correct");
                    });
                    setTimeout(loadNextQuestion, 2000);
                }
            } else {
                if (selected === correct) {
                    btn.classList.add("correct");
                    recordCorrectAnswer(currentPlayer);
                    playSound(true);
                    speak(currentWord[currentLanguage]);
                } else {
                    btn.classList.add("wrong");
                    recordWrongAnswer(currentPlayer);
                    playSound(false);
                    requeueForPractice(currentWord);
                    document.querySelectorAll("#options-container .btn").forEach(b => {
                        if (b.innerText === correct) b.classList.add("correct");
                    });
                }
                setTimeout(nextTurn, 2800);
            }
            updateUI();
        }

        function nextTurn() {
            if (activeMode === 'Obiektyw') {
                currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
            }
            loadNextQuestion();
        }

        function endStage() {
            document.getElementById("options-container").style.display = "none";
            document.getElementById("speech-mode-row").style.display = "none";
            const mainText = document.getElementById("main-question-text");
            const btn = document.getElementById("stage-btn");
            const saveKey = getProgressSaveKey();
            const maxStages = getMaxStagesForCategory(activeCategory);
            if (mistakesThisStage <= 2) {
                const rewardRows = applyStageRewards(true);
                const rewardHtml = buildRewardHtml(rewardRows);
                if (currentStage >= maxStages) {
                    const completionTitle = activeCategory === 'daily' ? `🎯 Dzisiejszy trening ukończony!` : activeCategory === 'trudne' ? `💪 Trudne słowa przećwiczone!` : isLessonMaterial() ? `🏆 Lekcja ${currentLesson} ukończona w 100%!` : `🏆 Poziom ukończony w 100%!`;
                    const completionText = activeCategory === 'daily'
                        ? `Krótka codzienna powtórka zaliczona. Tak buduje się nawyk.`
                        : activeCategory === 'trudne'
                        ? `Najtrudniejsze słowa wrócą rzadziej, gdy odpowiesz poprawnie.`
                        : isLessonMaterial()
                        ? `Przeszliście ćwiczenie z lekcji: ${lessonDatabase[currentLesson].title}.`
                        : `Przeszliście wszystkie ${maxStages} etapów. Jesteście gotowi na więcej!`; 
                    mainText.innerHTML = `${completionTitle}<br><br><span style='font-size:16px; font-weight:400; color:#22c55e;'>${completionText}</span>${rewardHtml}`;
                    currentStage = 1;

                    // Po ukończeniu poziomu pasek ma dopiero wtedy pokazać 100%.
                    document.getElementById("stage-progress-fill").style.width = "100%";
                    document.getElementById("stage-progress-percent").innerText = "100%";
                    document.getElementById("stage-progress-stage").innerText = `Poziom ukończony`;
                    document.getElementById("stage-progress-left").innerText = `Zostało: 0`;
                    document.getElementById("stage-display").innerText = `Poziom ukończony`;
                    document.getElementById("progress-display").innerText = `Zostało: 0`;

                    const optionsContainer = document.getElementById("options-container");
                    optionsContainer.innerHTML = "";
                    optionsContainer.style.display = "grid";

                    const levelBtn = document.createElement("button");
                    levelBtn.type = "button";
                    levelBtn.className = "btn";
                    levelBtn.innerText = isLessonMaterial() ? "📚 Wybierz lekcję" : "🌱 Zmień poziom";
                    levelBtn.onclick = isLessonMaterial() ? openLessons : backToLevels;
                    optionsContainer.appendChild(levelBtn);

                    const modeBtn = document.createElement("button");
                    modeBtn.type = "button";
                    modeBtn.className = "btn back-btn";
                    modeBtn.innerText = "⬅ Zmień tryb";
                    modeBtn.onclick = backToCategories;
                    optionsContainer.appendChild(modeBtn);
                } else {
                    mainText.innerHTML = `🎉 Etap ${currentStage} zaliczony!<br><br><span style='font-size:16px; font-weight:400; color:#475569;'>Błędy w kolejce: ${mistakesThisStage} / 2</span>${rewardHtml}`;
                    currentStage++;
                }
                if (window.confetti) confetti({particleCount: 150, spread: 80, origin: { y: 0.65 }});
                localStorage.setItem(saveKey, currentStage);
                btn.innerText = currentStage === 1 ? "Zacznij od początku poziomu" : "Następny etap";
            } else {
                mainText.innerHTML = `❌ Etap niezaliczony!<br><br><span style='font-size:16px; font-weight:400; color:#ef4444;'>Zbyt dużo błędów: ${mistakesThisStage} (limit 2).</span>`;
                btn.innerText = "Powtórz etap";
            }
            btn.style.display = "block";
        }

        function endSprintGame() {
            if (sprintTimer) clearInterval(sprintTimer);
            sprintTimer = null;
            document.getElementById("options-container").style.display = "none";
            document.getElementById("timer-display").style.display = "none";
            const mainText = document.getElementById("main-question-text");
            const btn = document.getElementById("stage-btn");
            const key = `sprintHighScore_${activeMode}_Level${currentLevel}_EN`;
            const currentRecord = parseInt(localStorage.getItem(key) || "0", 10);
            const isNewRecord = sprintScore > currentRecord;
            if (isNewRecord) localStorage.setItem(key, sprintScore);
            let sprintRewardHtml = "";
            if (sprintScore > 0 && activeMode !== 'Obiektyw') {
                const profile = loadProfile(activeMode);
                const before = getLevelInfo(profile.xp).level;
                const earned = Math.max(5, sprintScore * 5);
                profile.xp += earned;
                profile.completedStages = (profile.completedStages || 0) + 1;
                updateStreak(profile);
                const newBadges = [];
                evaluateBadges(profile, 'sprint', newBadges);
                const after = getLevelInfo(profile.xp).level;
                saveProfile(profile);
                sprintRewardHtml = buildRewardHtml([{ player: activeMode, earned, profile, levelUp: after > before, newBadges, correct: sprintScore, wrong: 0 }]);
                renderProfilesSummary();
            }
            if (isNewRecord && window.confetti) confetti({particleCount: 200, spread: 100, origin: { y: 0.6 }});
            mainText.innerHTML = `<span style='color:#ef4444;'>💥 CZAS MINĄŁ! 💥</span><br><br>Twój wynik: <span style='color:#22c55e; font-size:36px;'>${sprintScore}</span> pkt.<br><br>` +
                (isNewRecord ? `👑 NOWY REKORD (Poziom ${currentLevel})! 👑` : `Twój rekord (Poziom ${currentLevel}): ${currentRecord} pkt.`) + sprintRewardHtml;
            btn.innerText = "Zagraj jeszcze raz ↻";
            btn.style.display = "block";
            timeLeft = 60;
        }

        function updateUI() {
            if (activeCategory === 'sprint') {
                document.getElementById("score-agata").innerText = `${player1Name}: ${activeMode === player1Name ? sprintScore : 0}`;
                document.getElementById("score-darek").innerText = `${player2Name}: ${activeMode === player2Name ? sprintScore : 0}`;
            } else {
                document.getElementById("score-agata").innerText = `${player1Name}: ${scores[player1Name] || 0}`;
                document.getElementById("score-darek").innerText = `${player2Name}: ${scores[player2Name] || 0}`;
                const maxStages = getMaxStagesForCategory(activeCategory);
                const leftCount = questionsQueue.length + (currentWord && currentWord.pl ? 1 : 0);

                // Pasek pokazuje REALNY postęp: ukończone etapy + postęp w aktualnym etapie.
                // Dzięki temu w krótkich lekcjach/liczbach nie stoi na 0% aż do końca.
                const totalInStage = Math.max(1, currentStageTotalQuestions || leftCount || 1);
                const answeredInStage = Math.min(totalInStage, Math.max(0, totalInStage - leftCount));
                const stageFraction = answeredInStage / totalInStage;
                const stagePercent = maxStages > 0
                    ? Math.round((((currentStage - 1) + stageFraction) / maxStages) * 100)
                    : 0;

                document.getElementById("stage-display").innerText = isLessonMaterial() ? `Lekcja ${currentLesson}: ${currentStage} / ${maxStages}` : `Etap: ${currentStage} / ${maxStages}`;
                document.getElementById("progress-display").innerText = `Zostało: ${leftCount}`;
                document.getElementById("stage-progress-fill").style.width = `${Math.min(99, Math.max(0, stagePercent))}%`;
                document.getElementById("stage-progress-percent").innerText = `${Math.min(99, Math.max(0, stagePercent))}%`;
                document.getElementById("stage-progress-stage").innerText = activeCategory === 'daily' ? `Dzisiejszy trening` : activeCategory === 'trudne' ? `Trudne słowa` : isLessonMaterial() ? `Lekcja ${currentLesson} • etap ${currentStage} z ${maxStages}` : `Etap ${currentStage} z ${maxStages}`;
                document.getElementById("stage-progress-left").innerText = `Zostało: ${leftCount}`;
                document.getElementById("turn-indicator").innerText = `Kolej: ${currentPlayer}`;
                document.getElementById("score-agata").classList.toggle("active-player-highlight", currentPlayer === player1Name);
                document.getElementById("score-darek").classList.toggle("active-player-highlight", currentPlayer === player2Name);
            }
        }


        function stopSpeechEngine() {
            clearSpeechHints();
            speechEngineStarted = false;
            speechProcessing = false;
            pendingSpeechText = "";
            if (speechFinishTimer) clearTimeout(speechFinishTimer);
            speechMicButton = null;
            if (recognition) {
                try { recognition.stop(); } catch (e) {}
            }
        }

        function backToLevels() {
            stopSpeechEngine();
            document.getElementById("category-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("level-screen").style.display = "block";
        }

        function backToCategories() {
            stopSpeechEngine();
            if (sprintTimer) {
                clearInterval(sprintTimer);
                sprintTimer = null;
            }
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("category-screen").style.display = "block";
            if (isLessonMaterial()) {
                document.getElementById("cat-welcome-msg").innerText = `📚 Lekcja ${currentLesson}: ${lessonDatabase[currentLesson].title} — wybierz ćwiczenie:`;
                document.getElementById("sprint-nav-btn").style.display = "none";
            } else {
                document.getElementById("cat-welcome-msg").innerText = `${getCurrentMaterialLabel()} — wybierz ćwiczenie:`;
                document.getElementById("sprint-nav-btn").style.display = activeMode === 'Obiektyw' ? "none" : "block";
            }
        }

        function logout() {
            stopSpeechEngine();
            document.getElementById("level-screen").style.display = "none";
            document.getElementById("lesson-screen").style.display = "none";
            document.getElementById("login-screen").style.display = "block";
        }

        document.addEventListener("DOMContentLoaded", () => {
            const p1Input = document.getElementById("player1-input");
            const p2Input = document.getElementById("player2-input");

            if (p1Input) {
                p1Input.value = player1Name;
                p1Input.addEventListener("input", updateLoginScreenButtons);
                p1Input.addEventListener("blur", readAndSavePlayerNames);
            }
            if (p2Input) {
                p2Input.value = player2Name;
                p2Input.addEventListener("input", updateLoginScreenButtons);
                p2Input.addEventListener("blur", readAndSavePlayerNames);
            }
            updateLoginScreenButtons();
        });

        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("./service-worker.js").catch(error => {
                    console.log("Service Worker nie został zarejestrowany:", error);
                });
            });
        }
