import { createContext, FC, useContext, useMemo, useReducer, useRef } from "react";

const AudioPlayerContext = createContext<any>(undefined);

export interface AudioReducerState {
	playing: boolean;
	muted: boolean;
	duration: number;
	currentTime: number;
	meta: any | null;
}

const reducers = {
	SET_META(state: AudioReducerState, action: any | null): AudioReducerState {
		return { ...state, meta: action.payload };
	},
	PLAY(state: AudioReducerState) {
		return { ...state, playing: true };
	},
	PAUSE(state: AudioReducerState) {
		return { ...state, playing: false };
	},
	TOGGLE_MUTE(state: AudioReducerState) {
		return { ...state, muted: !state.muted };
	},
	SET_CURRENT_TIME(state: AudioReducerState, action: { payload: number }) {
		return { ...state, currentTime: action.payload };
	},
	SET_DURATION(state: AudioReducerState, action: { payload: number }) {
		return { ...state, duration: action.payload };
	},
};

function audioReducer(
	state: AudioReducerState,
	action: { type: keyof typeof reducers; payload?: any }
) {
	return reducers[action.type](state, action as any);
}

export default function AudioProvider({ children }: { children: any }) {
	let [state, dispatch] = useReducer(audioReducer, {
		playing: false,
		muted: false,
		duration: 0,
		currentTime: 0,
		meta: null,
	});
	let playerRef = useRef<HTMLAudioElement>(null);

	let actions = useMemo(() => {
		return {
			play(data: any) {
				if (data) {
					dispatch({ type: "SET_META", payload: data });

					if (playerRef.current && playerRef.current.currentSrc !== data.audio.src) {
						let playbackRate = playerRef.current.playbackRate;
						playerRef.current.src = data.audio.src;
						playerRef.current.load();
						playerRef.current.pause();
						playerRef.current.playbackRate = playbackRate;
						playerRef.current.currentTime = 0;
					}
				}

				playerRef.current?.play();
			},
			pause() {
				playerRef.current?.pause();
			},
			toggle(data: any) {
				this.isPlaying(data) ? actions.pause() : actions.play(data);
			},
			seekBy(amount: number) {
				playerRef.current!.currentTime += amount;
			},
			seek(time: number) {
				playerRef.current!.currentTime = time;
			},
			playbackRate(rate: number) {
				playerRef.current!.playbackRate = rate;
			},
			toggleMute() {
				dispatch({ type: "TOGGLE_MUTE" });
			},
			isPlaying(data: any) {
				return data
					? state.playing && playerRef.current?.currentSrc === data.audio.src
					: state.playing;
			},
		};
	}, [state.playing]);

	let api = useMemo(() => ({ ...state, ...actions }), [state, actions]);

	return (
		<>
			<AudioPlayerContext.Provider value={api}>{children}</AudioPlayerContext.Provider>
			<audio
				ref={playerRef}
				onPlay={() => dispatch({ type: "PLAY" })}
				onPause={() => dispatch({ type: "PAUSE" })}
				onTimeUpdate={(event) => {
					dispatch({
						type: "SET_CURRENT_TIME",
						payload: Math.floor((event.target as any).currentTime!),
					} as const);
				}}
				onDurationChange={(event) => {
					dispatch({
						type: "SET_DURATION",
						payload: Math.floor((event.target as any).duration),
					});
				}}
				muted={state.muted}
			/>
		</>
	);
}

export function useAudioPlayer(data?: any) {
	let player = useContext<any>(AudioPlayerContext);

	return useMemo(
		() => ({
			...player,
			play() {
				player.play(data);
			},
			toggle() {
				player.toggle(data);
			},
			get playing() {
				return player.isPlaying(data);
			},
		}),
		[player, data]
	);
}
