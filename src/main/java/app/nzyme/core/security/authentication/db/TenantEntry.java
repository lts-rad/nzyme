package app.nzyme.core.security.authentication.db;

import com.google.auto.value.AutoValue;
import org.joda.time.DateTime;

import java.util.UUID;

@AutoValue
public abstract class TenantEntry {

    public abstract UUID uuid();
    public abstract UUID organizationUuid();
    public abstract String name();
    public abstract String description();
    public abstract int sessionTimeoutMinutes();
    public abstract int sessionInactivityTimeoutMinutes();
    public abstract int mfaTimeoutMinutes();
    public abstract DateTime createdAt();
    public abstract DateTime updatedAt();

    public static TenantEntry create(UUID uuid, UUID organizationUuid, String name, String description, int sessionTimeoutMinutes, int sessionInactivityTimeoutMinutes, int mfaTimeoutMinutes, DateTime createdAt, DateTime updatedAt) {
        return builder()
                .uuid(uuid)
                .organizationUuid(organizationUuid)
                .name(name)
                .description(description)
                .sessionTimeoutMinutes(sessionTimeoutMinutes)
                .sessionInactivityTimeoutMinutes(sessionInactivityTimeoutMinutes)
                .mfaTimeoutMinutes(mfaTimeoutMinutes)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();
    }

    public static Builder builder() {
        return new AutoValue_TenantEntry.Builder();
    }

    @AutoValue.Builder
    public abstract static class Builder {
        public abstract Builder uuid(UUID uuid);

        public abstract Builder organizationUuid(UUID organizationUuid);

        public abstract Builder name(String name);

        public abstract Builder description(String description);

        public abstract Builder sessionTimeoutMinutes(int sessionTimeoutMinutes);

        public abstract Builder sessionInactivityTimeoutMinutes(int sessionInactivityTimeoutMinutes);

        public abstract Builder mfaTimeoutMinutes(int mfaTimeoutMinutes);

        public abstract Builder createdAt(DateTime createdAt);

        public abstract Builder updatedAt(DateTime updatedAt);

        public abstract TenantEntry build();
    }
}

