package horse.wtf.nzyme.ethernet.dns;

import horse.wtf.nzyme.ethernet.Ethernet;
import horse.wtf.nzyme.ethernet.dns.db.DNSStatisticsBucket;
import org.joda.time.DateTime;

import java.util.List;

public class DNS {

    private final Ethernet ethernet;

    public DNS(Ethernet ethernet) {
        this.ethernet = ethernet;
    }

    public List<DNSStatisticsBucket> getStatistics(int hours) {
        return ethernet.getNzyme().getDatabase().withHandle(handle ->
                handle.createQuery("SELECT date_trunc('MINUTE', created_at) AS bucket, " +
                                "SUM(request_count) AS request_count, SUM(request_bytes) AS request_bytes, " +
                                "SUM(response_count) AS response_count, SUM(response_bytes) AS response_bytes, " +
                                "SUM(nxdomain_count) AS nxdomain_count FROM dns_statistics " +
                                "WHERE created_at > :created_at " +
                                "GROUP BY bucket ORDER BY bucket DESC")
                        .bind("created_at", DateTime.now().minusHours(hours))
                        .mapTo(DNSStatisticsBucket.class)
                        .list()
        );
    }

}