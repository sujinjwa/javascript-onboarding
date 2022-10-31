function problem7(user, friends, visitors) {
  let current_friends = [];
  let recommendations = [];
  let recommendations2 = [];

  const push_current_friend = (person) => {
    current_friends.push(person);
  };

  const find_current_friends = () => {
    for (let i = 0; i < friends.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (user == friends[i][j]) {
          push_current_friend(friends[i][1 - j]);
        }
      }
    }
  };

  const push_recommendations = (person, score) => {
    recommendations.push([person, score]);
  };

  const find_friends_of_friends = () => {
    for (let i = 0; i < current_friends.length; i++) {
      for (let j = 0; j < friends.length; j++) {
        for (let k = 0; k < 2; k++) {
          if (
            current_friends[i] == friends[j][k] &&
            friends[j][1 - k] != user &&
            !current_friends.includes(friends[j][1 - k])
          ) {
            push_recommendations(friends[j][1 - k], 10);
          }
        }
      }
    }
    console.log(recommendations);
  };

  const find_visitors = () => {
    for (let i = 0; i < visitors.length; i++) {
      isBreak = false;
      for (let j = 0; j < current_friends.length; j++) {
        if (visitors[i] == current_friends[j]) {
          isBreak = true;
          break;
        }
      }
      if (!isBreak) {
        push_recommendations(visitors[i], 1);
      }
    }
  };

  const push_recommendations2 = (person, score) => {
    recommendations2.push({ name: person, score: score });
  };

  const find_sum_of_score = () => {
    for (let i = 0; i < recommendations.length - 1; i++) {
      let score_sum = recommendations[i][1];
      for (let j = i + 1; j < recommendations.length; j++) {
        // 같은 사람인 경우
        if (recommendations[i][0] == recommendations[j][0]) {
          score_sum += recommendations[j][1];
          recommendations.splice(j, 1);
          j--;
        }
      }
      push_recommendations2(recommendations[i][0], score_sum);
    }
  };

  const sort_recommendations2 = () => {
    recommendations2.sort(function (a, b) {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      // 점수 같을 경우
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  };

  const find_5_recommendations = () => {
    let answer = [];
    for (let i = 0; i < recommendations2.length; i++) {
      if (i > 4) {
        break;
      }
      answer.push(recommendations2[i].name);
    }
    return answer;
  };

  const solution = () => {
    find_current_friends();
    find_friends_of_friends();
    find_visitors();
    find_sum_of_score();
    sort_recommendations2();
  };

  solution();
  console.log(recommendations2);

  return find_5_recommendations();
}

problem7(
  "mrko",
  [
    ["mrko", "jun"],
    ["donut", "jun"],
    ["donut", "mrko"],
    ["shakevan", "andole"],
    ["shakevan", "jun"],
    ["shakevan", "mrko"],
  ],
  ["bedi", "bedi", "donut", "bedi", "shakevan"]
);

module.exports = problem7;
