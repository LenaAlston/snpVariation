############################################################################################################

# Script to test parsing File4 collected by Human Genome Diversity Project. This script currently only parses the genomes of 30 individuals
# due to memory constraints but will eventually be modified to handle the scope.
# See phased combined HGDP and HapMap data
# https://web.stanford.edu/group/rosenberglab/hgdpsnpDownload.html

############################################################################################################

import sys

# file 4
data = sys.argv[1]

input = open(data, 'r')

out = open('snpID.txt','w')
print "Truncating snpID.txt!"
out.truncate()

out2 = open('snpVar.txt','w')
print "Truncating snpVar.txt!"
out2.truncate()

lines = input.readlines()

rsNums = lines[0].split(' ')
# lines[1] is region number, don't need
chNums = lines[2].split(' ')
chLoc = lines[3].split(' ')

for snp in range(len(rsNums)):
    out.write(rsNums[snp])
    out2.write(rsNums[snp])
    out.write(", ")
    out2.write("\n")
    out.write(chNums[snp])
    out.write(", ")
    out.write(chLoc[snp])
    out.write("\n")
    # writes rsNums[snp], chNums[snp], chLoc[snp]
    
    # TESTING, only checking 30 individuals
    for i in range(4, 34):            #len(lines)):
        indiv = lines[i].split(' ')
        out2.write(indiv[0])        # Hapmap ID (rs#)
        out2.write("\t")
        out2.write(indiv[1])    # Population code
        out2.write("-")
        out2.write(indiv[2])    # Population name
        out2.write("\t")
        out2.write(indiv[snp+7])    # Allele
        out2.write("\n")

out.close()
print "snpID.txt closed."
out2.close()
print "snpVar.txt closed."

