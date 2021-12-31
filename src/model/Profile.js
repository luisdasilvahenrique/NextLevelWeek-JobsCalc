let data = {
  name: "Luis Henrique",
  avatar: "https://github.com/luisdasilvahenrique.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 2,
  "value-hour": 75,
};

module.exports = {
    get(){
      return data;
    },
    update(newData){
      data = newData;
    }
}
