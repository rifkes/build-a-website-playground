import lerp from '@/utils/lerp';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { getDatabase, onValue, off, ref, set, } from 'firebase/database';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Cursors({}) {

	const { firebaseApp, points, sessionId, } = useSiteGlobals();

  const database = useMemo(() => {
    if (!firebaseApp) return null;
    return getDatabase(firebaseApp);
	}, [firebaseApp]);
	
	const controllersObject = useRef({});

  useEffect(() => {
    if (!database) return;

		const controllersRef = ref(database, 'controllers');

		points.current = [];

    onValue(controllersRef, (snapshot) => {
			const data = snapshot.val() || {};
			controllersObject.current = data;

			const dateNow = new Date().getTime();

			Object.entries(data).forEach(([id, {lastActive, }]) => {
				if (dateNow - lastActive > 100000) {
					set(ref(database, `/controllers/${id}`), null);
				}
			});

			// first check for any points that no longer exist
			if (Object.keys(data).length !== points.current.length) {
				const pointsToRemove = points.current.filter((point) => {
					return !Object.keys(data).includes(point.id);
				});
				pointsToRemove.forEach((point) => {
					const index = points.current.indexOf(point);
					points.current[index].removed = true;
					points.current[index].targetStrength = 0;
				});
			}

			Object.entries(data).forEach(([id, { x, y, lastActive, }]) => {
				let found = false;
				points.current.forEach((point) => {
					if (point.id === id) {
						found = true;
					}
				});
				if (!found) {
					// if doesn't exist yet
					points.current.push({
						x, y,
						id,
						removed: false,
						target: {
							x, y,
						},
						strength: 0,
						targetStrength: 1,
						position: {
							x, y,
						}
					});
				} else {
					// if exists already
					points.current.forEach((point) => {
						if (point.id === id) {
							point.x = x;
							point.y = y;
							point.target = {
								x, y,
							};
						}
					});
				}
			});
		});

    return () => {
			off(controllersRef);
    };
	}, [database, points, sessionId,]);

	useEffect(() => {
		let raf = null;

		const animate = () => {
			raf = requestAnimationFrame(animate);

			points.current.forEach((point) => {
				if (point.id === sessionId) {
					point.position.x = lerp(point.position.x, point.target.x, 0.1);
					point.position.y = lerp(point.position.y, point.target.y, 0.1);
					point.strength = lerp(point.strength, point.targetStrength, 0.01);
				} else {
					point.position.x = lerp(point.position.x, point.target.x, 0.1);
					point.position.y = lerp(point.position.y, point.target.y, 0.1);
					point.strength = lerp(point.strength, point.targetStrength, 0.01);
					if (point.removed && point.strength < 0.01) {
						points.current.splice(points.current.indexOf(point), 1);
					}
				}
			});
		};

		animate();
		return () => {
			cancelAnimationFrame(raf);
		};
	}, [points, sessionId,]);

	return null;
}