import type { FPLBootstrapStatic } from '@/lib/types/FPLStatic';
import type { Manager } from '@/lib/types/Manager';
import type { League } from '@/lib/types/FPLLeague';
import type { Transfer } from '@/lib/types/FPLTransfer';
import type { PlayerHistory } from './lib/types/FPLPlayerHistory';
import type { UserGw, UserDatabase } from './lib/types/FPLUserGW';
import type { Events } from './lib/types/FPLEvents';
import type { Fines } from './app/lib/types/FPLFine';
import type { Fixtures } from './lib/types/FPLFixtures';
import { type } from 'os';


declare global {
  type FPLStatic = FPLBootstrapStatic;
  type FPLManager = Manager;
  type FPLLeague = League
  type FPLTransfers = Transfer;
  type FPLPlayerHistory = PlayerHistory;
  type FPLUserGameweek = UserGw;
  type UserTransfer = UserTransfer;
  type FPLEvents = Events;
  type FPLFixtures = Fixtures;
  type EventDatabase = EventDatabase;
  type UserDatabase = UserDatabase;
  type FPLFines = Fines;
}

