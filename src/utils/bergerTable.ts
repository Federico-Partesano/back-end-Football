export const bergerTable = (teams: any[], useDummy=false, dummy: Record<any, any>={}) => {
    
    if (!Array.isArray(teams)) 
        teams = Array.from({ length: teams }).map((_, i) => i);
    else 
        teams = [...teams]; // copy array to avoid side effects
    if (teams.length % 2 !== 0)
        teams.push(dummy);

    const n = teams.length;
    const numberOfRounds = n-1;
    const gamesPerRound = n/2;

    let columnA = teams.slice(0, gamesPerRound);
    let columnB = teams.slice(gamesPerRound);
    const fixed = teams[0];

    return Array.from({length: numberOfRounds}).map((_, i) => {
        let gameCount = 1;
        let round = Array.from({length: gamesPerRound}).reduce((acc, _, k) => {
            if (useDummy || (columnA[k] !== dummy && columnB[k] !== dummy)) {
                (acc as any).push({
                    round: i+1,
                    game: gameCount,
                    teamA: columnA[k],
                    teamB: columnB[k]
                }); 
                gameCount++;
            }
            return acc;
        }, []);

        // rotate elements
        columnA = [fixed, columnB.shift(), ...columnA.slice(1)];
        columnB.push(columnA.pop());
        return round;
    });
}