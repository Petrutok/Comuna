'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';

declare global {
  interface Window {
    OneSignal: any;
    OneSignalDeferred: any[];
  }
}

export function NotificationButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifică starea notificărilor când componenta se încarcă
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    try {
      if (window.OneSignal) {
        const permission = await window.OneSignal.Notifications.permission;
        setIsSubscribed(permission === true);
        setIsLoading(false);
      } else {
        // Așteaptă ca OneSignal să se încarce
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async function(OneSignal: any) {
          const permission = await OneSignal.Notifications.permission;
          setIsSubscribed(permission === true);
          setIsLoading(false);
        });
      }
    } catch (error) {
      console.error('Eroare la verificarea stării notificărilor:', error);
      setIsLoading(false);
    }
  };

  const toggleNotifications = async () => {
    try {
      if (!window.OneSignal) {
        alert("OneSignal nu este încărcat. Reîncarcă pagina.");
        return;
      }

      setIsLoading(true);

      if (isSubscribed) {
        // Dezactivează notificările
        await window.OneSignal.User.PushSubscription.optOut();
        setIsSubscribed(false);
        alert("Notificări dezactivate! Nu vei mai primi notificări push.");
      } else {
        // Activează notificările
        const permission = await window.OneSignal.Notifications.requestPermission();
        
        if (permission === true) {
          await window.OneSignal.User.PushSubscription.optIn();
          setIsSubscribed(true);
          alert("Notificări activate! Vei primi notificări despre evenimente și anunțuri importante.");
        } else if (permission === false) {
          alert("Ai refuzat permisiunea pentru notificări. Poți activa notificările din setările browserului.");
        }
      }
    } catch (error) {
      console.error('Eroare la gestionarea notificărilor:', error);
      alert("A apărut o eroare. Încearcă din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={toggleNotifications}
      disabled={isLoading}
      variant={isSubscribed ? "secondary" : "default"}
      size="sm"
      className="flex items-center gap-2"
    >
      {isSubscribed ? (
        <>
          <BellOff className="h-4 w-4" />
          <span className="hidden sm:inline">Dezactivează notificări</span>
          <span className="sm:hidden">Notificări</span>
        </>
      ) : (
        <>
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Activează notificări</span>
          <span className="sm:hidden">Notificări</span>
        </>
      )}
    </Button>
  );
}