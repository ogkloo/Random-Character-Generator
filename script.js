function Character(name, ability_scores, classname, race, sex, level, feats, hp, alignment) {
	this.name = name;
	this.scores = ability_scores;
	this.classname = classname;
	this.race = race;
	this.sex = sex;
	this.feats = feats;
	this.level = level;
	this.hitpoints = hp;
	this.alignment = alignment;
	this.bannedSchools = "";
	if (this.classname == "Wizard"){
		this.classname = generateSpecialtyOrGod(this.classname, this.alignment);
		if(this.classname != "Wizard"){
			this.bannedSchools = generateBannedSchools(this.classname);
		}
	}
}

//Helper functions

var bonus = function(score){
	a = Math.floor((score-10)/2);
	if(a>=1){
		return "+" + a;
	}else{
		return a;
	}
}

var bonusint = function(score){
	return Math.floor((score-10)/2);
}

var contains =function(a, obj) {
    for (var i = 0; i < a.length; i++){
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

//Databases
var fnames = ["Emily", "Isabelle", "Samantha", "Alice", "Jessica", "Mary", "Kristen", "Kirsten", "Taylor"];
var mnames = ["William", "Finn", "Luke", "Robert", "Max", "Matthew", "Chandler", "Joseph", "Stephen", "Kenneth", "Christian", "Mason", "James", "Theodore", "Franklin", "Nicholas", "Oscar", "Oswald", "Samuel", "Collin", "Kent", "Alexander", "Fletcher"];
var surnames = ["Carter", "Taylor", "Grant", "Knight", "Shaw", "Mason", "Mann", "Burnett", "Kinglover", "Nailo", "Chandlerson", "Kenson", "Balsiger", "Smith", "Fischer", "The Rotund", "The Great", "The Hung", "Houger", "Fataua", "Lyons", "Barnes"];
var races = ["Human", "Elf", "Dwarf", "Halfling", "Half-orc", "Half-elf", "Gnome"];
var classes = ["Barbarian", "Fighter", "Rogue", "Cleric", "Druid", "Ranger", "Paladin", "Monk", "Wizard", "Sorcerer", "Bard"];

var myAlignment = function(cclass){
	var lvc = ["Lawful", "Neutral", "Chaotic"];
	var gve = ["Good", "Neutral", "Evil"];
	if(classes.indexOf(cclass) != 0 && classes.indexOf(cclass) != 10 && classes.indexOf(cclass) != 7 && classes.indexOf(cclass) != 6){
		a = lvc[Math.floor(Math.random()*lvc.length)] + " " + gve[Math.floor(Math.random()*gve.length)];
		if(a == "Neutral Neutral"){
			return "Neutral";
		}else{
			return a;
		}
	}else if(classes.indexOf(cclass) == 7){
		return lvc[0] + " " + gve[Math.floor(Math.random()*gve.length)];
	}else if(classes.indexOf(cclass) == 6){
		return "Lawful Good";
	}else{
		return lvc[2] + " " + gve[Math.floor(Math.random()*gve.length)];
	}
}

var mySex = function(){
	var a = (Math.floor(Math.random()*2)+1);
	if(a == 1){
		return "Female";
	}else{
		return "Male";
	}
};

var myName = function(sex) {
	if (sex=="Female"){
		return fnames[Math.floor(Math.random()*fnames.length)] + " " + surnames[Math.floor(Math.random()*surnames.length)];
	}else{
		return mnames[Math.floor(Math.random()*mnames.length)] + " " + surnames[Math.floor(Math.random()*surnames.length)];
	}
};

//myAbilities = myAbilities.sort(function(a, b){return b-a});
//generating ability scores

var myClass = function(){
	return classes[Math.floor(Math.random()*classes.length)];
};
var myRace = function(){
	return races[Math.floor(Math.random()*races.length)];
};	//this can just be a string literal

//redoing ability scores to match class
var charClass = myClass();
var finalAbilities = function(){
	//generating ability scores
	var myAbilities = [];
	while(myAbilities.length < 6){
  		var randomnumber=Math.floor((Math.random()*10)+8);
  		var found=false;
  		myAbilities[myAbilities.length]=randomnumber;
	}
	var sortAbilities = myAbilities.concat();
	sortAbilities.sort(function(a, b){return b-a});
	var highest = myAbilities.indexOf(Math.max(...myAbilities)); //Position in abilities array of highest value
	switch(classes.indexOf(charClass)){
		case 0: //Barbarian: Prioritize strength, con, dex. Mental abilities randomized among lowest.
			var a = (Math.floor(Math.random()*2)+1);
			switch(a){
				case 1:
					myAbilities = myAbilities.swap(highest, 0);
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 1); // Oh god fix this
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[2]), 2);
					break;
				case 2:
					myAbilities = myAbilities.swap(highest, 1);
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 0);
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[2]), 2);
					break;
				case 3:
					myAbilities = myAbilities.swap(highest, 0);
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 2);
					myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[2]), 1);
				}
			return myAbilities;
			break;
		case 1: //Fighter: Prioritize either strength or dex, then second into con. All others randomized among lowest.
			var a = (Math.floor(Math.random()*2)+1);
			if(a == 1){
				myAbilities = myAbilities.swap(highest, 0);
				myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 2);
			}else{
				myAbilities = myAbilities.swap(highest, 1);
				myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 2);
			}
			return myAbilities;
			break;
		case 2: //Rogue: Prioritize either dex or int, second going into the one that was unchosen. All others random.
			var a = (Math.floor(Math.random()*2)+1);
			if(a == 1){
				myAbilities = myAbilities.swap(highest, 1);
				myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 3);
			}else{
				myAbilities = myAbilities.swap(highest, 3);
				myAbilities = myAbilities.swap(myAbilities.indexOf(sortAbilities[1]), 1);
			}
			return myAbilities;
			break;
		case 3: //Cleric: Prioritize Wis, then con.
			myAbilities = myAbilities.swap(4, highest);
			return myAbilities;
			break;
		case 4: //Druid: Prioritize wis.
			myAbilities = myAbilities.swap(4, highest);
			return myAbilities;
			break;
		case 5: //Ranger: Prioritize dex, then wis or strength, then the unchosen.
			return myAbilities;
			break;
		case 6: //Paladin: Str, con, wis, cha.
			return myAbilities;
			break;
		case 7: //Monk: Four important abilities, ergo it can be totally random.
			return myAbilities;
			break;
		case 8: //Wizard: int
			myAbilities = myAbilities.swap(3, highest);
			return myAbilities;
			break;
		case 9: //Sorcerer: cha
			myAbilities = myAbilities.swap(5, highest);
			return myAbilities;
			break;
		case 10: //Bard: cha
			myAbilities = myAbilities.swap(5, highest);
			return myAbilities;
			break;
	}
};

var modifyAbilitiesOnRace = function(race, myAbilities){
	switch(races.indexOf(race)){
		case 0:	//Human
			return myAbilities;
			break;
		case 1: //Elf
			myAbilities[1] = myAbilities[1]+2;
			myAbilities[2] = myAbilities[2]-2;
			return myAbilities;
			break;
		case 2: //Dwarf
			myAbilities[2] = myAbilities[2]+2;
			myAbilities[5] = myAbilities[5]-2;
			return myAbilities;
			break;
		case 3: //Halfling
			myAbilities[1] = myAbilities[1]+2;
			myAbilities[0] = myAbilities[0]-2;
			return myAbilities;
			break;
		case 4: //Half-orc
			myAbilities[0] = myAbilities[0]+2;
			myAbilities[3] = myAbilities[3]-2;
			myAbilities[5] = myAbilities[5]-2;
			return myAbilities;
			break;
		case 5: //Half-elf
			return myAbilities;
			break;
		case 6: //Gnome
			myAbilities[2] = myAbilities[2]+2;
			myAbilities[0] = myAbilities[0]-2;
			return myAbilities;
			break;
	}
}
//Feats will be added at some point in the future when I am less lazy
var feats = ["acrobatic", "agile", "alertness", "animalAffinity", "athletic", "toughness", "weaponFocus"];

var getNumFeats = function(Characterclass, level, race){
	if (classes.indexOf(Characterclass) == 1){
		return ((Math.floor((5*level))/6)+2);
	}else if(classes.indexOf(Characterclass)==8){
		return Math.floor(level/3)+Math.floor(level/5)+1;
	}else{
		return Math.floor(level/3)+1;
	}
}

var myFeats = function(numFeats){
	var cFeats = [];
	for(i=0;i<numFeats;i++){
		var consideredFeat = feats[Math.floor(Math.random()*feats.length)];
		if(!contains(cFeats, consideredFeat)){
			cFeats.push(consideredFeat);
		}
	}
	return cFeats;
}

var myHP = function(cclass, scores){
	var a = 0;
	if(contains(charfeats, "toughness")){
		a = a+3;
	}
	switch (classes.indexOf(cclass)){
		case 0:
			return a + Math.floor(Math.random()*6)+6+bonusint(scores[2]);
			break;
		case 1:
			return a + Math.floor(Math.random()*5)+5+bonusint(scores[2]);
			break;
		case 2:
			return a + Math.floor(Math.random()*3)+3+bonusint(scores[2]);
			break;
		case 3:
			return a + Math.floor(Math.random()*4)+4+bonusint(scores[2]);
			break;
		case 4:
			return a + Math.floor(Math.random()*4)+4+bonusint(scores[2]);
			break;
		case 5:
			return a + Math.floor(Math.random()*4)+4+bonusint(scores[2]);
			break;
		case 6:
			return a + Math.floor(Math.random()*5)+5+bonusint(scores[2]);
			break;
		case 7:
			return a + Math.floor(Math.random()*4)+4+bonusint(scores[2]);
			break;
		case 8:
			return a + Math.floor(Math.random()*2)+2+bonusint(scores[2]);
			break;
		case 9:
			return a + Math.floor(Math.random()*2)+2+bonusint(scores[2]);
			break;
		case 10:
			return a + Math.floor(Math.random()*3)+3+bonusint(scores[2]);
			break;
	}
}

/**/
var mkCharacter = function(){
	var charrace = myRace();
	var charsex = mySex();
	var myLevel = 1;
	var abilscores = modifyAbilitiesOnRace(charrace, finalAbilities());
	charfeats = myFeats(getNumFeats(charClass, myLevel, charrace));
	var hp = myHP(charClass, abilscores);
	while(hp<0){
		var hp = myHP(charClass, abilscores);
	}
	return new Character(myName(charsex), abilscores, charClass, charrace, charsex, myLevel, charfeats, hp, myAlignment(charClass));
}
var myCharacter = mkCharacter();
//JQUERY
$("document").ready(function(){
	$("#name_field").html(myCharacter.name);
	$("#racesex_field").html(myCharacter.alignment + " " + myCharacter.sex + " " + myCharacter.race);
	$("#class_field").html(myCharacter.classname + " " + myCharacter.bannedSchools + " " + myCharacter.level);
	$("#HPField").html("HP: " + myCharacter.hitpoints);
	$("#Abilitiesstr").html("<td>Strength</td>" + "<td>" + myCharacter.scores[0] + "</td><td>" + bonus(myCharacter.scores[0]) + "</td>");
	$("#Abilitiesagi").html("<td>Dexterity</td>" + "<td>" + myCharacter.scores[1] + "</td><td>" + bonus(myCharacter.scores[1]) + "</td>");
	$("#Abilitiescon").html("<td>Constitution</td>" + "<td>" + myCharacter.scores[2] + "</td><td>" + bonus(myCharacter.scores[2]) + "</td>");
	$("#Abilitiesint").html("<td>Intelligence</td>" + "<td>" + myCharacter.scores[3] + "</td><td>" + bonus(myCharacter.scores[3]) + "</td>");
	$("#Abilitieswis").html("<td>Wisdom</td>" + "<td>" + myCharacter.scores[4] + "</td><td>" + bonus(myCharacter.scores[4]) + "</td>");
	$("#Abilitiescha").html("<td>Charisma</td>" + "<td>" + myCharacter.scores[5] + "</td><td>" + bonus(myCharacter.scores[5]) + "</td>");
	//$("#featslist").html("<tr><td>" + window[myCharacter.feats[0]].name + ":</td><td>" + window[myCharacter.feats[0]].effect + "</td></tr>");
	var newHTML = [];
	$.each(myCharacter.feats, function(index, value) {
		newHTML.push("<tr><td>" + window[value].name + ":</td><td>" + window[value].effect + "</td></tr>");
	});
	$("#featslist").html(newHTML.join(""));
	$("#portrait").attr("src", portrait(myCharacter.classname, myCharacter.race, myCharacter.sex, myCharacter.alignment))
});
