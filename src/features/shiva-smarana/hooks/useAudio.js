// Audio hook using Howler for Shiva Smarana
import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import useShivaSmaranaStore from '../store/useShivaSmaranaStore';

const useAudio = () => {
    const isMuted = useShivaSmaranaStore((state) => state.isMuted);
    const toggleMute = useShivaSmaranaStore((state) => state.toggleMute);

    // Audio references
    const dropletSoundRef = useRef(null);
    const chantSoundRef = useRef(null);

    // Initialize sounds
    useEffect(() => {
        // Droplet/splash sound
        dropletSoundRef.current = new Howl({
            src: ['/audio/droplet.mp3'],
            volume: 0.5,
            mute: isMuted
        });

        // Om Namah Shivaya chant
        chantSoundRef.current = new Howl({
            src: ['/audio/om-namah-shivaya.mp3'],
            volume: 0.7,
            mute: isMuted
        });

        return () => {
            if (dropletSoundRef.current) dropletSoundRef.current.unload();
            if (chantSoundRef.current) chantSoundRef.current.unload();
        };
    }, []);

    // Update mute state when it changes
    useEffect(() => {
        if (dropletSoundRef.current) dropletSoundRef.current.mute(isMuted);
        if (chantSoundRef.current) chantSoundRef.current.mute(isMuted);
    }, [isMuted]);

    const playDropletSound = useCallback(() => {
        if (dropletSoundRef.current && !isMuted) {
            dropletSoundRef.current.play();
        }
    }, [isMuted]);

    const playChantSound = useCallback(() => {
        if (chantSoundRef.current && !isMuted) {
            // Stop any currently playing chant before starting new one
            chantSoundRef.current.stop();
            chantSoundRef.current.play();
        }
    }, [isMuted]);

    const stopAllSounds = useCallback(() => {
        if (dropletSoundRef.current) dropletSoundRef.current.stop();
        if (chantSoundRef.current) chantSoundRef.current.stop();
    }, []);

    return {
        isMuted,
        toggleMute,
        playDropletSound,
        playChantSound,
        stopAllSounds
    };
};

export default useAudio;
