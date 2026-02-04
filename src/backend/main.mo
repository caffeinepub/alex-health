import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Error "mo:core/Error";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  public type Reminder = {
    id : Text;
    title : Text;
    category : Text;
    scheduleTime : Time.Time;
    isActive : Bool;
  };

  public type WellnessLog = {
    id : Text;
    date : Time.Time;
    category : Text;
    details : Text;
  };

  public type ExerciseLog = {
    id : Text;
    date : Time.Time;
    workoutType : Text;
    durationMinutes : Nat;
    intensity : Text;
    notes : Text;
  };

  public type UserProfile = {
    name : Text;
    goals : Text;
    preferences : Text;
  };

  module ExerciseLog {
    public func compareByDate(log1 : ExerciseLog, log2 : ExerciseLog) : Order.Order {
      Int.compare(log1.date, log2.date);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent state
  let reminders = Map.empty<Principal, List.List<Reminder>>();
  let wellnessLogs = Map.empty<Principal, List.List<WellnessLog>>();
  let exerciseLogs = Map.empty<Principal, List.List<ExerciseLog>>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Reminder functions
  public shared ({ caller }) func addReminder(reminder : Reminder) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage reminders");
    };

    let userReminders = switch (reminders.get(caller)) {
      case (null) { List.empty<Reminder>() };
      case (?existing) { existing };
    };

    userReminders.add(reminder);
    reminders.add(caller, userReminders);
  };

  public query ({ caller }) func getReminders() : async [Reminder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view reminders");
    };

    let userReminders = switch (reminders.get(caller)) {
      case (null) { List.empty<Reminder>() };
      case (?existing) { existing };
    };
    userReminders.toArray();
  };

  public shared ({ caller }) func updateReminder(reminderId : Text, updatedReminder : Reminder) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage reminders");
    };

    let userReminders = switch (reminders.get(caller)) {
      case (null) { List.empty<Reminder>() };
      case (?existing) { existing };
    };

    let updatedList = userReminders.map<Reminder, Reminder>(
      func(r : Reminder) : Reminder {
        if (r.id == reminderId) { updatedReminder } else { r };
      }
    );

    reminders.add(caller, updatedList);
  };

  public shared ({ caller }) func deleteReminder(reminderId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage reminders");
    };

    let userReminders = switch (reminders.get(caller)) {
      case (null) { List.empty<Reminder>() };
      case (?existing) { existing };
    };

    let filteredList = userReminders.filter(
      func(r : Reminder) : Bool { r.id != reminderId }
    );

    reminders.add(caller, filteredList);
  };

  // Wellness Log functions
  public shared ({ caller }) func addWellnessLog(log : WellnessLog) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wellness logs");
    };

    let userLogs = switch (wellnessLogs.get(caller)) {
      case (null) { List.empty<WellnessLog>() };
      case (?existing) { existing };
    };

    userLogs.add(log);
    wellnessLogs.add(caller, userLogs);
  };

  public query ({ caller }) func getWellnessLogsByDate(date : Time.Time) : async [WellnessLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wellness logs");
    };

    let userLogs = switch (wellnessLogs.get(caller)) {
      case (null) { List.empty<WellnessLog>() };
      case (?existing) { existing };
    };

    userLogs.filter(
      func(log) { log.date == date }
    ).toArray();
  };

  public shared ({ caller }) func updateWellnessLog(logId : Text, updatedLog : WellnessLog) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wellness logs");
    };

    let userLogs = switch (wellnessLogs.get(caller)) {
      case (null) { List.empty<WellnessLog>() };
      case (?existing) { existing };
    };

    let updatedList = userLogs.map<WellnessLog, WellnessLog>(
      func(l : WellnessLog) : WellnessLog {
        if (l.id == logId) { updatedLog } else { l };
      }
    );

    wellnessLogs.add(caller, updatedList);
  };

  public shared ({ caller }) func deleteWellnessLog(logId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wellness logs");
    };

    let userLogs = switch (wellnessLogs.get(caller)) {
      case (null) { List.empty<WellnessLog>() };
      case (?existing) { existing };
    };

    let filteredList = userLogs.filter(
      func(l : WellnessLog) : Bool { l.id != logId }
    );

    wellnessLogs.add(caller, filteredList);
  };

  // Exercise Log functions
  public shared ({ caller }) func addExerciseLog(log : ExerciseLog) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage exercise logs");
    };

    let userExerciseLogs = switch (exerciseLogs.get(caller)) {
      case (null) { List.empty<ExerciseLog>() };
      case (?existing) { existing };
    };

    userExerciseLogs.add(log);
    exerciseLogs.add(caller, userExerciseLogs);
  };

  public query ({ caller }) func getExerciseLogsByDateRange(startDate : Time.Time, endDate : Time.Time) : async [ExerciseLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view exercise logs");
    };

    let userExerciseLogs = switch (exerciseLogs.get(caller)) {
      case (null) { List.empty<ExerciseLog>() };
      case (?existing) { existing };
    };

    userExerciseLogs.filter(
      func(log) { log.date >= startDate and log.date <= endDate }
    ).toArray().sort(ExerciseLog.compareByDate);
  };

  public shared ({ caller }) func updateExerciseLog(logId : Text, updatedLog : ExerciseLog) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage exercise logs");
    };

    let userExerciseLogs = switch (exerciseLogs.get(caller)) {
      case (null) { List.empty<ExerciseLog>() };
      case (?existing) { existing };
    };

    let updatedList = userExerciseLogs.map<ExerciseLog, ExerciseLog>(
      func(l : ExerciseLog) : ExerciseLog {
        if (l.id == logId) { updatedLog } else { l };
      }
    );

    exerciseLogs.add(caller, updatedList);
  };

  public shared ({ caller }) func deleteExerciseLog(logId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage exercise logs");
    };

    let userExerciseLogs = switch (exerciseLogs.get(caller)) {
      case (null) { List.empty<ExerciseLog>() };
      case (?existing) { existing };
    };

    let filteredList = userExerciseLogs.filter(
      func(l : ExerciseLog) : Bool { l.id != logId }
    );

    exerciseLogs.add(caller, filteredList);
  };

  // Profile functions
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };
};
